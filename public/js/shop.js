// Add to cart
$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault()
  animateCartIn(e)
  if ($(".qty").val()){
    var qty = $this.val()
  }else{qty = 1}

  console.log(qty)
  $.ajax({
    url: '/shop/addToCart',
    type: 'POST',
    data: {id: this.id, qty: qty}
  })
  .then(function(resp){
    console.log(resp)
    animateCartOut()
  })
})

// change qunatiies
$(".content-wrap").on("click", ".plus", function(e){
  console.log(e.target.id)
  var id = e.target.id;
  qtyId = id.slice(id.indexOf("-") + 1)
  console.log(qtyId)
  var val = $("#qty-"+qtyId).val()
  val = parseInt(val) + 1
  $("#qty-"+qtyId).val(val)
})

$(".content-wrap").on("click", ".minus", function(){
  console.log(e.target.id)
  var id = e.target.id;
  qtyId = id.slice(id.indexOf("-") + 1)
  console.log(qtyId)
  var val = $("#qty-"+qtyId).val()
  val = parseInt(val) - 1
  $("#qty-"+qtyId).val(val)
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
