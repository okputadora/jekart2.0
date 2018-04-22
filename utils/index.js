const controllers = require('../controllers/')
const Promise = require('bluebird')

module.exports = {
  displayCart: (cart) => {
    return new Promise((resolve, reject) => {
      console.log("step 1")
      let promises = []
      cart.items.forEach(item => {
        console.log("should be any items")
        console.log(item.id)
        console.log(item.framed)
        promises.push(controllers['prints'].getByParam({_id: item.id}))
      })
      Promise.all(promises).then(resultsArr => {
        const displayResultsArr = resultsArr.map((result, i) => {
          let price = parseInt(result[0].price1)
          let qty = parseInt(cart.items[i].qty)
          let framed = cart.items[i].framed
          if (framed == 'true'){
            framed = 'checked'
            price = price + 50
          }
          if (cart.items[i].qty >= 3){price = result[0].price3}
          else if (cart.items[i].qty === 2){price = result[0].price2}
          let totalPrice = price*qty
          // edit id so that the same painting has unique id based on framed value
          return ({
            name: result[0].name,
            image: result[0].image1,
            framed: framed,
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
