var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
const galleryImport = require('../galleries.js')
const galleries = galleryImport.galleries;
require('dotenv').config()

var stripe = require('stripe')(process.env.STRIPE_SK)

router.post('/', function(req, res, next){
  console.log(req.session.cart)
  let items = req.session.displayCart;
  let description = '';
  // create description from items
  items.forEach((item, i) => {
    description += (i + 1) + ". " + item.qty + "x " + item.name + " "
    if (item.framed == "Yes"){
      description += "framed. "
    }
    else description += "unframed. "
  })
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
    description: description,
    metadata: {data: description},
    receipt_email: customer.email,
  }))
  .then(charge => {
    console.log(charge)
    res.render('paymentConfirmation', {
      galleries: galleries
    })
  })
  .catch(err => console.log(err))

});


module.exports = router;
