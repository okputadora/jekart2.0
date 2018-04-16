Inquiry = require('../models/inquiry')
var Promise = require('bluebird')
var sgMail = require('@sendgrid/mail');


module.exports = {
  get: function(){
    return new Promise(function(resolve, reject){
      // null =
      Inquiry.find(null, function(err, inquiries){
        if (err){
          reject(err)
          return
        }
        resolve(inquiries)
      })
    })
  },
  getById: function(id){
    return new Promise(function(resolve, reject){
      Inquiry.findById(id, function(err, inquiry){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
      })
    })
  },
  post: function(params){
    // send email via sendgrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'josephekart@gmail.com',
      from: params.email,
      subject: params.subject,
      text: params.message
    }
    sgMail.send(msg, (error, result) => {
      if (error){
        return
      }
    })
    // add to database
    return new Promise(function(resolve, reject){
      Inquiry.create(params, function(err, inquiry){
       if (err){
         reject(err)
         return
       }
       resolve(inquiry)
      })
    })
  },
  update: function(id, params){
    return new Promise(function(resolve, reject){
      Inquiry.findByIdAndUpdate(id, params, {new:true}, function(err, inquiry){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
        return
      })
    })
  },
  remove: function(id){
    return new Promise(function(resolve, reject){
      Inquiry.findByIdAndRemove(id, function(err, result){
        if (err){
          reject(err)
          return
        }
        resolve(inquiry)
      })
    })
  }
}
