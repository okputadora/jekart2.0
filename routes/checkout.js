var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
const galleries = require('../galleries.js')
require('dotenv').config()

var stripe = require('stripe')(process.env.STRIPE_SK)

router.post('/', function(req, res, next){
  console.log(req.session.cart)
  let amount = req.session.cart.grandTotal + "00"
  amount = parseInt(amount)
  console.log(amount)
  console.log(req.body)
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  })
  .then(customer => stripe.charges.create({
    amount: amount,
    description: 'Joseph Edgerton Krause Art',
    currency: 'usd',
    customer: customer.id,
  }))
  .then(charge => res.render('paymentConfirmation', {
    galleries: galleries
  }))
  .catch(err => console.log(err))

});


module.exports = router;
