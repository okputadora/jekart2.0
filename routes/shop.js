const express = require('express');
const controllers = require('../controllers/');
const galleryImport = require('../galleries');
const Cart = require('../models/cart')
const utils = require('../utils/')
const galleries = galleryImport.galleries;
const router = express.Router();


router.get('/', (req, res, next) => {
  let cartCount = null
  if (req.session.cart){
    cartCount = req.session.cart.totQty;
  }
  controller = controllers['prints']
  controller.get()
  .then((prints) => {
    if (cartCount == 0){
      cartCount = "";
    }
    res.render('shop', {
      galleries: galleries,
      prints: prints,
      cartCount: cartCount,
    })
  })
  .catch(error => {
    res.render('error', {galleries: galleries})
  })
})

router.get('/cart', (req, res, next) => {
  let cart = req.session.cart
  if (cart){
    cartCount = req.session.cart.totQty;
    utils.displayCart(cart, "cart")
    .then((displayCart) => {
      if (cartCount == 0){
        cartCount = "";
      }
      res.render('cart', {
        galleries: galleries,
        cart: displayCart,
        cartCount: cartCount
      })
    })
    .catch(err => {
      res.render('cart', {
        galleries: galleries,
      })
    })
    return;
  }
  res.render('cart', {
    galleries: galleries,
  })
})

router.post('/checkout', (req, res, next) => {
  let cart = req.session.cart;
  let cartCount = "+" + req.session.cart.totQty;
  let shippingCost = "Free Shipping";
  let pickup = false;
  let grandTotal = 0;
  utils.displayCart(cart, "checkout")
  .then((displayCart) => {
    let cartTotal = 0;
    // sum the prices in the cart
    displayCart.forEach(item => {
      cartTotal += (parseInt(item.price) * parseInt(item.qty))
      grandTotal = cartTotal;
    })
    // if pickup add 15% discount
    if (req.body['radio-group-1'] === "pickup"){
      shippingCost = cartTotal * .15;
      grandTotal = cartTotal - shippingCost
      grandTotal = Math.round(grandTotal * 10) / 10;
      shippingCost = "- $"+shippingCost
    }
    // because stripe doesn't use decimals in their prices
    // we need to reformat this a bit //CONVERT THIS TO TERNARY IF
    let stripeTotal = grandTotal + "00"
    grandTotal = grandTotal.toString()
    if (grandTotal.indexOf(".") > -1){
      stripeTotal = grandTotal.slice(0, grandTotal.indexOf(".")) + grandTotal.slice(grandTotal.indexOf("." + 1)) + "0";
    }
    let pk = process.env.STRIPE_PK;
    let items = JSON.stringify(cart.items);
    // keep this data server side
    req.session.charge = {cart: displayCart, stripeTotal, cartTotal, shippingCost, grandTotal, shippingCost};
    if (cartCount == 0){
      cartCount = "";
    }
    res.render('checkout', {
      galleries: galleries,
      cart: displayCart,
      cartTotal: cartTotal,
      grandTotal: grandTotal,
      stripeTotal: stripeTotal,
      items: items,
      shippingCost: shippingCost,
      cartCount: cartCount,
      pk: pk
    })
  })
  .catch((err) => {
    res.render('checkout', {
      galleries: galleries,
    })
  })
})

router.post('/:action', (req,res,next) => {
  let oldCart = [];
  let oldTotQty = 0;
  if (req.session.cart){
    oldCart = req.session.cart.items;
    oldTotQty = req.session.cart.totQty;
  }
  let cart = new Cart(oldCart, oldTotQty)
  if (req.params.action === 'addToCart'){
    cart.add(req.body.id, req.body.qty, req.body.framed)
    req.session.cart = cart;
    res.send(200)
  }
  else if (req.params.action === "updateCart"){
    let items = JSON.parse(req.body.items);
    // create a new empty cart and add elements one at a time,
    // because the user can toggle the framing options here, it's possible
    // we now have a duplicate in our cart
    let cart = new Cart([], 0)
    items.forEach(item => {
      cart.add(item.id, item.qty, item.framed)
    })
    req.session.cart = cart;
    utils.displayCart(cart, "cart")
    .then(displayCart => {
      res.json(displayCart)
    })
  }
})

router.get('/:item', (req,res,next) => {
  let totQty = null;
  if (req.session.cart){
    totQty = req.session.cart.totQty;
    if (totQty == 0){
      totQty = "";
    }
  }
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
      cartCount: totQty,
      framedPrice: 50, // change this after updating the db to print.framedPrice
      galleries: galleries,
      id: print._id
    })
  })
  .catch(error => {
    res.render("error", {galleries: galleries})
  })
})

module.exports = router;
