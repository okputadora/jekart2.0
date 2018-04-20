var Prints = require('../models/prints')
var Promise = require('bluebird')

module.exports = {
  // create a new gallery
  get: function(){
    return new Promise(function(resolve, reject){
      Prints.find(function(err, results) {
        if (err) {
          reject(err)
          return;
        }
        resolve(results);
      }).sort({Order: 1})
    })
  },
  getByParam: function(param){
    return new Promise(function(resolve, reject){
      Prints.find(param, function(err, item) {
        if (err){
          reject(err)
          return
        }
        console.log("returning a print item")
        resolve(item);
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Prints.create(params, function(err, item){
        if (err){
          reject(err)
          return
        }
        resolve(item)
        return
      })

    })
  }
}
