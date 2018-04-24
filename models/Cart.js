module.exports = function Cart(oldCart){
  this.items = oldCart;
  this.add = (id, qty, framed) => {
    let foundDuplicate = false;
    this.items.forEach((item, i) => {
      if (item.id === id && item.framed == framed){
        item.qty = parseInt(item.qty) + parseInt(qty)
        foundDuplicate = true;
        return;
      }
    })
    if (!foundDuplicate){
      let newItem = {id: id, qty: qty, framed: framed};
      this.items.push(newItem)
    }
  };
  this.remove = (id) => {
    this.items.splice(this.items.indexOf(id), 1)
  }
  this.clearAll = () => {

  }
}
