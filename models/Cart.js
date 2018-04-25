module.exports = function Cart(oldCart, oldQty){
  this.items = oldCart;
  this.totQty = oldQty;
  this.add = (id, qty, framed) => {
    this.totQty = parseInt(this.totQty) + parseInt(qty)
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
  this.remove = (id, qty) => {
    this.totQty = parseInt(this.totQty) + parseInt(qty)
    this.items.splice(this.items.indexOf(id), 1)
  }
  this.clearAll = () => {

  }
}
