var mongoose = require('mongoose')
var artSchema = new mongoose.Schema({
  id: {type:Number, required: true},
  name: {type:String, trim:true, lowercase:true, default:''},
  imagePath: {type:String, trim:true, lowercase:true, default:''},
  galleryName: {type:String, trim:true, lowercase:true, default:''},
  galleryId: {type:Number, trim:true},
  coverPhoto: {type:String, trim:true, lowercase:true, default:''},
  dimensions: {type:String, trim:true, lowercase:true, default:''},
  description: {type:String, trim:true, lowercase:true, default:''},
  forSale: {type:String, trim:true, lowercase:true, default:''},
  price: {type:String, lowercase:true, trim:true, default:''},
  order: {type:Number, trim:true}
})

module.exports = mongoose.model('artSchema', artSchema)
