const express = require('express');
const controllers = require('../controllers/');
const galleryImport = require('../galleries');
const Cart = require('../models/cart')
const utils = require('../utils/')
const galleries = galleryImport.galleries;
const router = express.Router();


router.get('/', (req, res, next) => {
  console.log("cart: ", req.session.cart)
  controller = controllers['prints']
  controller.get()
  .then((prints) => {
    res.render('shop', {
      galleries: galleries,
      prints: prints
    })
  })
  .catch(error => {
    res.render('error', {galleries: galleries})
  })
})

router.get('/cart', (req, res, next) => {
  let cart = req.session.cart
  if (cart){
    utils.displayCart(cart, "cart")
    .then((displayCart) => {
      console.log(displayCart)
      res.render('cart', {
        galleries: galleries,
        cart: displayCart
      })
    })
    .catch(err => {
      res.render('cart', {
        galleries: galleries,
      })
      // console.log("error: ", err)
    })
    return;
  }
  res.render('cart', {
    galleries: galleries,
  })
})

router.post('/checkout', (req, res, next) => {
  console.log("checkin out!")
  let cart = req.session.cart;
  let shipping = false;
  let shippingCost = 0;
  let pickup = false;
  let grandTotal = 0;
  utils.displayCart(cart, "checkout")
  .then((displayCart) => {
    let cartTotal = 0;
    displayCart.forEach(item => {
      cartTotal += (parseInt(item.price) * parseInt(item.qty))
      if (item.framed == "Yes"){
        console.log("item framed")
        shippingCost += 5;
      }
    })
    if (req.body['radio-group-1'] === "delivery"){
      shipping = true;
      grandTotal = cartTotal + shippingCost
    }
    else{
      pickup = true;
      grandTotal = cartTotal - 5;
    }
    res.render('checkout', {
      galleries: galleries,
      cart: displayCart,
      cartTotal: cartTotal,
      grandTotal: grandTotal,
      shipping: shipping,
      pickup: pickup,
      shippingCost: shippingCost
    })
  })
  .catch((err) => {
    res.render('checkout', {
      galleries: galleries,
    })
  })
})

router.post('/:action', (req,res,next) => {
  if (req.params.action === 'addToCart'){
    let oldCart = []
    if (req.session.cart){
      oldCart = req.session.cart.items
    }
    console.log("creating new cart")
    let cart = new Cart(oldCart)
    console.log("cart created")
    console.log(req.body.id, req.body.qty, req.body.framed)
    cart.add(req.body.id, req.body.qty, req.body.framed)
    console.log("added new item")
    req.session.cart = cart;
    console.log(cart)
    res.send(200)
  }
  else if (req.params.action === "removeFromCart"){
    let oldCart = []
    if (req.session.cart){
      oldCart = req.session.cart.items
    }
    let cart = new Cart(oldCart)
    cart.remove(req.body.id, req.body.qty)
    console.log(cart)
    req.session.cart = cart;
    res.send("200")
  }
  else if (req.params.action === "updateCart"){
    let items = JSON.parse(req.body.items);
    console.log("updated items: ", items)
    let cart = new Cart(items)
    console.log(cart)
    req.session.cart = cart;
    res.send(200)
  }
})

router.get('/:item', (req,res,next) => {
  var name = {name: req.params.item.trim()}
  controller = controllers['prints']
  controller.getByParam(name)
  .then(print => {
    print = print[0]
    var images = [print.image1]
    if (print.image2 != ""){
      images.push(print.image2)
    }
    res.render('shop-item', {
      name: print.name,
      images: [print.image1, print.image2],
      description: print.description,
      dimensions: print.dimensions,
      price1: print.price1,
      price2: print.price2,
      price3: print.price3,
      framedPrice: (print.price+50),
      galleries: galleries,
      id: print._id
    })
  })
  .catch(error => {
    res.render("error", {galleries: galleries})
  })
})




module.exports = router;
