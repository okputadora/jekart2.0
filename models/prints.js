var mongoose = require('mongoose')
var printsSchema = new mongoose.Schema({
  name: {type:String, trim:true, default:''},
  dimensions: {type:String, trim:true, lowercase:true, default:''},
  description: {type:String, trim:true, lowercase:true, default:''},
  price1: {type:Number, required:true, default:40},
  price2: {type:Number},
  price3: {type:Number},
  amountLeft: {type:Number},
  amount: {type:Number, default:50},
  galleryName: {type:String, trim:true, lowercase:true, default:''},
  image1: {type:String, trim:true, lowercase:true, default:''},
  image2: {type:String, trim:true, lowercase:true, default:''},
  order: {type:Number}
})

module.exports = mongoose.model('printsSchema', printsSchema)
