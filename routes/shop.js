const express = require('express');
const controllers = require('../controllers/');
const galleryImport = require('../galleries');
const Cart = require('../models/cart')
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
  console.log("loading cart view")
  let cart = req.session.cart
  console.log(cart.items)
  let promises = [];
  cart.items.forEach(item => {
    // remember this returns lists because it can also be used with
    // less specific params than id
    promises.push(controllers['prints'].getByParam({_id: item.id}))
  })
  Promise.all(promises).then(resultsArr => {

    const displayResultsArr = resultsArr.map((result, i) => {
      let price = parseInt(result[0].price1)
      let qty = parseInt(cart.items[i].qty)
      if (cart.items[i].qty >= 3){price = result[0].price3}
      else if (cart.items[i].qty === 2){price = result[0].price2}
      let totalPrice = price*qty
      return ({
        name: result[0].name,
        image: result[0].image1,
        description: result[0].description,
        price: price,
        qty: qty,
        total: totalPrice
      })
    })
    console.log(displayResultsArr[0].image)
    res.render('cart', {
      galleries: galleries,
      cart: displayResultsArr
    })
  })
  .catch(err => {
    console.log("error: ", err)
  })
})

router.get('/checkout', (req, res, next) => {
  console.log(req.session.cart)
  res.render('checkout', {
  })
})

router.post('/:action', (req,res,next) => {
    if (req.params.action === 'addToCart'){
      let oldCart = []
      if (req.session.cart){
        oldCart = req.session.cart.items
      }
      let cart = new Cart(oldCart)
      cart.add(req.body.id, req.body.qty)
      req.session.cart = cart;
      res.send("200")
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
