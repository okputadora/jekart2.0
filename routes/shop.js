var express = require('express');
var controllers = require('../controllers/')
const galleries = require('../galleries')
var router = express.Router();


router.get('/', (req, res, next) => {
  controller = controllers['prints']
  controller.get()
  .then((prints) => {
    console.log("loading shop")
    res.render('shop', {
      galleries: galleries,
      prints: prints
    })
  })
  .catch(error => {
    res.render('error', {galleries: galleries})
  })
})


router.get('/:item', function(req,res,next){
  var name = {name: req.params.item.trim()}
  controller = controllers['prints']
  controller.getByParam(name)
  .then(function(print){
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
  .catch(function(error){
    res.render("error", {galleries: galleries})
  })
})

module.exports = router;
