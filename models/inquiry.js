var mongoose = require('mongoose')
// matches the data from the contact form
var InquirySchema = new mongoose.Schema({
  name: {type:String, required:true, default:''},
  email: {type:String, required:true, default:''},
  subject: {type:String, required:true, default:''},
  message: {type:String, required:true, default:''},
  timestamp: {type:Date, required:true, default:Date.now()}
})

module.exports = mongoose.model('InquirySchema', InquirySchema)
