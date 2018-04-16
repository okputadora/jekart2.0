var eventsController = require('../controllers/eventsController')
var galleriesController = require('../controllers/galleriesController')
var artController = require('../controllers/artController')
var inquiryController = require('../controllers/inquiryController')
var printsController = require('../controllers/printsController')

module.exports = {
  events: eventsController,
  galleries: galleriesController,
  art: artController,
  inquiry: inquiryController,
  prints: printsController,
}
