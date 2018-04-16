var Galleries = require('../models/galleries')
var Promise = require('bluebird')

module.exports = {
  // create a new gallery
  post: function(params){
    return new Promise(function(resolve, reject){
      Galleries.create(params, function(err, result){
        if (err){
          reject(err)
          return
        }
        resolve(profile.summary())
        return
      })
    })
  }
}
