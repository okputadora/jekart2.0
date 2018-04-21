const controllers = require('../controllers/')
const Promise = require('bluebird')

module.exports = {
  displayCart: (cart) => {
    return new Promise((resolve, reject) => {
      let promises = []
      cart.items.forEach(item => {
        // remember this returns lists because it can also be used with
        // less specific params than id
        promises.push(controllers['prints'].getByParam({_id: item.id}))
      })
      Promise.all(promises).then(resultsArr => {
        const displayResultsArr = resultsArr.map((result, i) => {
          let price = parseInt(result[0].price1)
          let qty = parseInt(cart.items[i].qty)
          if (cart.items[i].qty >= 3){price = result[0].price3}
          else if (cart.items[i].qty === 2){price = result[0].price2}
          let totalPrice = price*qty
          return ({
            name: result[0].name,
            image: result[0].image1,
            description: result[0].description,
            price: price,
            qty: qty,
            total: totalPrice,
            id: result[0]._id
          })
        })
        resolve(displayResultsArr)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
