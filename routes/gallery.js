const express = require('express');
const controllers = require('../controllers/')
const router = express.Router();
// move this to the db eventually
const galleryImport = require('../galleries')
const galleries = galleryImport.galleries;

router.get('/:name', function(req, res, next){
  console.log("GETTING GALLERY")
  var name = req.params.name
  console.log(name)
  controller = controllers['art']
  controller.getByParam({galleryName: name})
  .then(function(gallery){
    var displayGallery = gallery.map(function(elem){
      var title = elem.name.split(" ")
      var capitalized = [];
      title.forEach(function(word){
        capitalWord = word.charAt(0).toUpperCase() + word.substring(1)
        capitalized.push(capitalWord)
      })
      console.log(capitalized)
      elem['displayName'] = capitalized.join(" ")
      console.log(elem.displayName)
      return elem;
    })
    // load special template for degradation sets
    if (name === "degradation sets"){
      res.render("degradation", {
        galleryName: name,
        gallery: displayGallery,
        galleries: galleries
      })
      return
    }
    res.render('gallery', {
      galleryName: name,
      gallery: displayGallery,
      galleries: galleries
    })
  })
  .catch(function(error){
    res.render("error", {galleries: galleries})
  })
})

router.get('/image/:name', function(req, res, next){
  var name = {name: req.params.name}
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
