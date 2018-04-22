const controllers = require('../controllers/')
const Promise = require('bluebird')

module.exports = {
  displayCart: (cart, page) => {
    return new Promise((resolve, reject) => {
      console.log("step 1")
      let promises = []
      cart.items.forEach(item => {
        console.log(item.id)
        console.log(item.framed)
        promises.push(controllers['prints'].getByParam({_id: item.id}))
      })
      Promise.all(promises).then(resultsArr => {
        const displayResultsArr = resultsArr.map((result, i) => {
          let price = parseInt(result[0].price1)
          let qty = parseInt(cart.items[i].qty)
          let framed = cart.items[i].framed
          let id = result[0]._id
          console.log("framed: ", framed)
          // well this isn't great. how come i have a string sometimes
          if (cart.items[i].qty >= 3){price = result[0].price3}
          else if (cart.items[i].qty === 2){price = result[0].price2}
          if ((framed == 'true' || framed === true) && page === "cart"){
            framed = 'checked'
            price = price + 50
            id = id + ".F"
          }
          else if ((framed == 'true' || framed === true ) && page === "checkout"){
            framed = 'yes'
          }
          else {framed = 'no'}
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
            id: id
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
