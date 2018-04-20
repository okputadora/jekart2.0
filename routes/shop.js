const express = require('express');
const controllers = require('../controllers/');
const galleryImport = require('../galleries');
const galleries = galleryImport.galleries;
const router = express.Router();


router.get('/', (req, res, next) => {
  controller = controllers['prints']
  controller.get()
  .then((prints) => {
    console.log(galleries)
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
  console.log("loading the cart")
  res.render('cart', {
    galleries: galleries,
  })
})

router.get('/checkout', (req, res, next) => {
  res.render('checkout', {
    galleries: galleries,
  })
})

router.post('/:action', (req,res,next) => {
    if (req.params.action === 'buildCart'){
      let cart = JSON.parse(req.body.cart);
      let promises = []
      cart.forEach(item => {
        promises.push(controllers['prints'].getByParam({_id: item}))
      })
      Promise.all(promises)
      .then(cart => {
        console.log(cart)
        // check if there is a current session
        //if not, create one
        // add item to cart var
        res.send(cart)
      })
      .catch(err => {
        console.log("error")
        console.log(err)
        res.send("404")
      })
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
