var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
const galleryImport = require('../galleries.js')
const galleries = galleryImport.galleries;
require('dotenv').config()

var stripe = require('stripe')(process.env.STRIPE_SK)

router.post('/', function(req, res, next){
  let items = req.session.charge.cart;
  console.log(items)
  let description = '';
  // create description from items
  items.forEach(item => {
    description +=  item.qty + "x " + item.name
    + " "
    if (item.framed == "Yes"){
      description += "framed: ";
    }
    else {description += "unframed: "}
    description += "$" + item.price + " --- ";
  })
  let amount = req.session.charge.grandTotal;
  description += 'Total: $' + amount;
  amount = parseInt(amount + "00");
  let shippingInfo = "local pickup";
  if (req.body.stripeShippingName){
    shippingInfo = {
      name: req.body.stripeShippingName,
      country: req.body.stripeShippingAddressCountry,
      zip: req.body.stripeShippingAddressZip,
      line1: req.body.stripeShippingAddressLine1,
      city: req.body.stripeShippingAddressCity,
      state: req.body.stripeShippingAddressState
    }
  }

  console.log(shippingInfo)
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
    metadata: {description: description, shipping: JSON.stringify(shippingInfo)},
    receipt_email: customer.email,
  }))
  .then(charge => {
    console.log(charge)
    res.render('paymentConfirmation', {
      galleries: galleries,
      message: "Your order has been processed.",
      message2: "Please check your inbox for confirmation and shipping details."
    })
  })
  .catch(err => {
    res.render('paymentConfirmation',{
      galleries: galleries,
      message: "An error occured while processing your transaction",
      message2: err
    })
  })

});


module.exports = router;
