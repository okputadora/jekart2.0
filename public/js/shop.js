// Add to cart
$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault()
  animateCartIn(e)
  if ($("#itemCount").val()){
    var qty = $("#itemCount").val()
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
$(".content-wrap").on("click", "#addItem", function(){
  var val = $("#itemCount").val()
  val = parseInt(val) + 1
  $("#itemCount").val(val);
})

$(".content-wrap").on("click", "#removeItem", function(){
  var val = $("#itemCount").val()
  val = parseInt(val) - 1
  if (val > 0){
    $("#itemCount").val(val)
  }
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
