var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var stripe = require('stripe')(process.env.STRIPE_TEST)

router.get('/', function(req, res, next){
  console.log("getting stripe info")
  // Create a new customer and then a new charge for that customer:
  stripe.users.retrieve("cus_ChltA5dlLy4pJJ", {
    api_key: process.env.STRIPE_TEST
  }, function(err, resp){
    console.log("hello!>!>!>!?")
    if (err){
      console.log(err)
      return;
    }
    console.log(resp)
  })
  res.redirect("/")
  // stripe.customers.create({
  //   description: 'Customer for zoey.jackson@example.com',
  //   source: "tok_visa" // obtained with Stripe.js
  // }).then(response => {
  //   console.log(err)
  // }).catch(err => {
  //   console.log(err)
  // })
  // asynchronously called
});

// router.post('/:action', function(req, res, next){
// 	var action = req.params.action;
// 	var controller = controllers[action];
// 	console.log(action)
// 	if (controller == null){
// 		res.json({
// 			confirmation:'fail',
// 			message:'Invalid resource...check your spelling'
// 		})
// 	}
// 	// req.body is the form data...input names from form must match names in the database schemas
// 	controller.post(req.body)
// 	.then(function(result){
// 		if (action == 'inquiry'){
// 			res.redirect('/confirmation')
// 			return
// 		}
// 		res.json({
// 			confirmation: 'success',
// 			result: result
// 		})
// 	})
// 	.catch(function(err){
// 		res.json({
// 			confirmation: 'fail',
// 			message: err
// 		})
// 	})
// })

module.exports = router;
