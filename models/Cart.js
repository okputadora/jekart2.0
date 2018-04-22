module.exports = function Cart(oldCart){
  this.items = oldCart;
  this.add = (id, qty, framed) => {
    // check to see if it's already in here
    console.log(framed)
    let foundDuplicate = false;
    console.log(oldCart)
    this.items.forEach((item, i) => {
      console.log(item)
      if (item.id === id && item.framed == framed){
        item.qty = parseInt(item.qty) + parseInt(qty)
        foundDuplicate = true;
        return;
      }
    })
    console.log("error below here")
    if (!foundDuplicate){
      console.log("in here")
      let newItem = {id: id, qty: qty, framed: framed};
      console.log("new item created")
      this.items.push(newItem)
      console.log("success")
    }
  };
  this.remove = (id) => {
    this.items.splice(this.items.indexOf(id), 1)
  }
  this.clearAll = () => {

  }
}
