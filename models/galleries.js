var mongoose = require('mongoose')

var GalleriesSchema = new mongoose.Schema({
  name: {type:String, trim:true, lowercase:true, required:true, default:''},
  imagePath: {type:String, trim:true, lowercase:true, required:true, default:''},
  order: {type:Number, trim:true, required:true},
})

module.exports = mongoose.model('GalleriesSchema', GalleriesSchema)
