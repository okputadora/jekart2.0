var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.get('/:resource', function(req, res, next){
	var resource = req.params.resource;
	console.log("trying to get")
	console.log(resource)
	var controller = controllers[resource]
	console.log(controller)
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	console.log(req.query)
	controller.get(req.query)
	.then(function(results){
		res.json({
	    confirmation: 'success',
	    results: results
	  })
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id
	var controller  = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

router.post('/:action', function(req, res, next){
	var action = req.params.action;
	var controller = controllers[action]
	console.log(action)
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	// req.body is the form data...input names from form must match names in the database schemas
	controller.post(req.body)
	.then(function(result){
		if (action == 'inquiry'){
			res.redirect('/confirmation')
			return
		}
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

module.exports = router;
