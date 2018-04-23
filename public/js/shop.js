// Add to cart
$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault();
  animateCartIn(e);
  // if we're adding it from a page where you can select quantity
  if ($(".qty").val()){
    // then grab that value
    var framed = $(".framed").is(":checked");
    var qty = $(".qty").val();
  }else{qty = 1; framed = false;}

  console.log(qty)
  $.ajax({
    url: '/shop/addToCart',
    type: 'POST',
    data: {id: this.id, qty: qty, framed: framed}
  })
  .then(function(resp){
    animateCartOut()
  })
})

// change qunatiies
$(".content-wrap").on("click", ".plus", function(){
  console.log("Cluick")
  var id = this.id
  console.log(id)
  qtyId = id.slice(id.indexOf("-") + 1)
  console.log(qtyId)
  console.log(qtyId)
  var val = $("#qty-"+qtyId).val()
  console.log($("#qty-"+qtyId).val())
  val = parseInt(val) + 1
  $("#qty-"+qtyId).val(val)
})

$(".content-wrap").on("click", ".edit", function(){
  $("#update-cart").prop("disabled", false);
  $("#checkout").prop("disabled", true);
})
$(".content-wrap").on("click", ".minus", function(){
  var id = this.id
  qtyId = id.slice(id.indexOf("-") + 1)
  console.log(qtyId)
  var val = $("#qty-"+qtyId).val()
  if (val > 1){
    val = parseInt(val) - 1
    $("#qty-"+qtyId).val(val)
  }
})

$(".content-wrap").on("click", ".remove", function(){
  console.log("HELLO")
  id = this.id
  console.log(id)
  removeId = id.slice(id.indexOf("-") + 1)
  console.log(id)
  $.ajax({
    url: '/shop/removeFromCart',
    type: "POST",
    data: {id: removeId}
  }).then(function(result){
    $("#"+removeId).remove()
  })
})

$("#update-cart").on("click", function(){
  // grab the list items
  var items = [];
  $('.cart_item').each(function(){
    var id = this.id;
    console.log(id)
    var qty = $("#qty-" +id).val();
    var framed = $("#framed-"+id).is(":checked")
    console.log(framed)
    // strip the display id
    if (id.indexOf("_") > -1){
      console.log("stripping _")
      id = id.slice(0, id.indexOf("_"))
      console.log(id)
    }
    console.log(qty)
    console.log(id, qty, framed)
    items.push({id: id, qty: qty, framed: framed});
  })
  items = JSON.stringify(items)
  $.ajax({
    url: '/shop/updateCart',
    type: 'POST',
    data: {items: items}
  }).then(function(resp){
    location.reload()
  })
})

$("#checkout").on("click", function(){
  var shipping = "sDeliv";
  if ($("#radio-2").is(":checked")){
    shipping = 'lPickup'
  }
  console.log("shipping ,", shipping)
  window.location = "/shop/checkout";
})
function animateCartIn(e){
  $("#cartAdded")
    .html('<i class="icon-shopping-cart"></i>')
    .offset({ top: e.pageY - 15, left: e.pageX - 15})
    .animate({opacity: 1,top: "-=50"}, 400, "swing")
}

function animateCartOut(){
  $("#cartAdded")
  .animate({
    top: "-=150",
    opacity: 0,
  }, 400)
}
