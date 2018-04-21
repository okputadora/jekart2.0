module.exports = function Cart(oldCart){
  this.items = oldCart;
  this.add = (id, qty) => {
    // check to see if it's already in here
    let foundDuplicate = false;
    this.items.forEach((item, i) => {
      console.log(item.id, id)
      if (item.id === id){
        item.qty = parseInt(item.qty) + parseInt(qty)
        foundDuplicate = true;
        return;
      }
    })
    if (!foundDuplicate){
      let newItem = {id: id, qty: qty};
      this.items.push(newItem)
    }
  },
  this.remove = (id) => {
    this.items.splice(this.items.indexOf(id), 1)
  }
  this.update = (id, qty) => {
    this.items.forEach(item => {
      if (item.id === id){
        item.qty = qty;
      }
    })
  },

  this.clearAll = () => {
    
  }
}
