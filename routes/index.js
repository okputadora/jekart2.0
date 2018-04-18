
// it seems like we're not actually using the api route to separate our
// concerns. shouldn't the api be handling not just the admins request for data
// but the users as well? but then what is the index route for? I thought it was
// for sending all of the pages to the user? Obviously I don't understand how
// different routes are supposed to be employed
var express = require('express');
var controllers = require('../controllers/')
var router = express.Router();

var galleries = [
  {name:'2017-2018', imagePath: 'bluemoon.png'},
  {name:'bedlam cups', imagePath: 'focalpoints.png'},
  {name:'scribble faces', imagePath: 'napkinfaces.png'},
  {name:'window', imagePath: 'windowdrip.png'},
  {name:'wood blocks', imagePath: 'thirdfloor.png'},
  {name:'deep resin', imagePath: 'resinman.png'},
  {name:'wood burning', imagePath: 'woodwinter.png'},
  {name:'degradation sets', imagePath: 'ds.png'},
  {name:'2016', imagePath: 'nobody.png'},
  {name:'2014-2015', imagePath: 'spaceman.png'},
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'JEK art',
    galleries: galleries
  });
})


router.get('/:page', function(req, res, next){
  var page = req.params.page
  // list of STATIC pages, dynamic pages have their own routes below
  var pages = ['statement', 'galleries', 'process', 'events',
      'upcoming-events', 'shop', 'past-events', 'contact', 'confirmation',
      'cart', 'checkout', 'admin']
  if (pages.indexOf(page) == -1){
    res.render('error', {galleries: galleries})
    return
  }
  if (page == "shop"){
    controller = controllers['prints']
    controller.get()
    .then(function(prints){
      console.log("loading shop")
      res.render('shop', {
        galleries: galleries,
        prints: prints
      })
    })
    .catch(function(error){
      res.render('error', {galleries: galleries})
    })
    return
  }
  res.render(page, {
    title: page,
    galleries: galleries
  })
})

router.get('/gallery/:name', function(req, res, next){
  var name = req.params.name
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
    console.log("rendering image")
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

router.get('/shop-item/:item', function(req,res,next){
  var name = {name: req.params.item.trim()}
  controller = controllers['prints']
  controller.getByParam(name)
  .then(function(print){
    console.log(print)
    print = print[0]
    var images = [print.image1]
    if (print.image2 != ""){
      images.push(print.image2)
    }
    console.log("OK...trying to render")
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
// contact form
router.post('/:action', function(req, res, next){
  var action = req.params.action
  if (action == 'inquiry'){
    res.redirect('/confirmation');
  }
})

module.exports = router;
