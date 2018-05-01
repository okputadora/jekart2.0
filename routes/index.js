
// it seems like we're not actually using the api route to separate our
// concerns. shouldn't the api be handling not just the admins request for data
// but the users as well? but then what is the index route for? I thought it was
// for sending all of the pages to the user? Obviously I don't understand how
// different routes are supposed to be employed
const express = require('express');
const controllers = require('../controllers/')
const router = express.Router();
// move this to the db eventually
const galleryImport = require('../galleries')
const galleries = galleryImport.galleries;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'JEK art',
    galleries: galleries
  });
})

router.get('/:page', function(req, res, next){
  var page = req.params.page
  // list of STATIC pages, dynamic pages have their own routes
  var pages = ['statement', 'galleries', 'process', 'events',
      'upcoming-events', 'past-events', 'contact', 'confirmation', 'admin']
  if (pages.indexOf(page) == -1){
    res.render('error', {galleries: galleries})
    return
  }
  res.render(page, {
    title: page,
    galleries: galleries
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
