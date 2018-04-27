const express = require('express');
const controllers = require('../controllers/')
const router = express.Router();
// move this to the db eventually
const galleryImport = require('../galleries')
const galleries = galleryImport.galleries;

router.get('/:name', function(req, res, next){
  var name = req.params.name
  controller = controllers['art']
  controller.getByParam({galleryName: name})
  .then(function(gallery){
    if (name === "degradation sets"){
      console.log(gallery[0].name)
      res.render("degradation", {
        galleryName: name,
        gallery: gallery,
        galleries: galleries
      })
      return
    }
    res.render('gallery', {
      galleryName: name,
      gallery: gallery,
      galleries: galleries
    })
  })
  .catch(function(error){
    res.render("error", {galleries: galleries})
  })
})

router.get('/image/:name', function(req, res, next){
  var name = {name: req.params.name}
  console.log(name)
  controller = controllers['art']
  controller.getByParam(name)
  .then(function(image){
    console.log(image.dimensions)
    image = image[0];
    res.render('image', {
      title: image.name,
      imagePath: image.imagePath,
      gallery: image.galleryName,
      description: image.description,
      dimensions: image.dimensions,
      galleries: galleries
    })
  })
  .catch(function(error){
    res.render("error", {galleries: galleries})
  })
})

module.exports = router;
