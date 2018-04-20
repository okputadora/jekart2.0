module.exports = function Cart(oldCart){
  this.items = oldCart;
  this.add = (id, qty) => {
    // check to see if it's already in here
    console.log("already items in the cart")
    let foundDuplicate = false;
    this.items.forEach((item, i) => {
      console.log(item.id, id)
      if (item.id === id){
        console.log("found duplicatr")
        item.qty = parseInt(item.qty) + parseInt(qty)
        console.log("success")
        foundDuplicate = true;
        return;
      }
    })
    if (!foundDuplicate){
      console.log("first item added")
      let newItem = {id: id, qty: qty};
      this.items.push(newItem)
    }
  }
}
