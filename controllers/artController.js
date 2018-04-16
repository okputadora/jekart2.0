var Art = require('../models/art')
var Promise = require('bluebird')


module.exports = {
  get: function(){
    return new Promise(function(resolve, reject){
      Art.find(function(err, result) {
        if (err) {
          reject(err)
          return;
        }
        resolve(result);
      })
    })
  },
  getByParam: function(param){
    return new Promise(function(resolve, reject){
      Art.find(param, null, function(err, art) {
        if (err){
          reject(err)
          return
        }
        resolve(art);
      }).sort({order: 1})
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Art.create(params, function(err, art){
        if (err){
          reject(err)
          return
        }
        resolve(art)
        return
      })

    })
  }
}
