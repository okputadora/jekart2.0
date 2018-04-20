// Add to cart
$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault()
  animateCartIn(e)
  var qty = $("#itemCount").val()
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
// console.log(window.location.href)
// if (window.location.href === "http://localhost:3000/shop/cart"){
//   $.ajax({
//     url: 'buildCart',
//     type: 'POST',
//     data: {cart: sessionStorage.getItem("cart")}
//   })
//   .then(function(cart){
//     console.log(cart)
//     cart.forEach(function(item){
//       item = item[0]
//       var tableRow = $("<tr>").addClass("cart_item")
//       var removeIcon = $("<td>").addClass("cart-product-remove")
//         .append('<a href="#" class="remove" title="Remove this item"><i class="icon-trash2"></i></a>')
//       var itemImage = $("<td>")
//         .append('<a href="#"><img class="custom-thumb" src="../art_imgs/prints/'+item.image1 + '" alt="'+ item.name +'"></a>')
//       var itemName = $("<td>").addClass("cart-product-name")
//         .append('<a>'+item.name+'</a>')
//       var itemPrice = $("<td>").addClass("cart-product-price")
//         .append('<span class="amount">$'+item.price1+'</span>')
//       var itemQuantity= $("<td>").addClass("cart-product-quantity")
//       var counter = $("<div>").addClass("quantity")
//         counter.append('<input type="button" value="-" class="minus">')
//         .append('<input type="text" name="quantity" value="1" class="qty" />')
//         .append('<input type="button" value="+" class="plus">')
//       itemQuantity.append(counter)
//       var itemTotal = $("<td>").addClass("cart-product-subtotal")
//         .append('<span class="amount">$'+item.price1+'</span>')
//       tableRow.append(removeIcon, itemImage, itemName, itemPrice, itemQuantity, itemTotal);
//       $("#cart-list").append(tableRow)
//     })
//   })
//   .catch(function(err){
//     console.log("error")
//     var tableRow = $("<tr>").addClass("cart_item")
//     var errorMessage = $("<p>").addClass("text-center")
//       .html("There doesn't appear to be anything in your cart yet")
//     tableRow.append(errorMessage)
//     $("#cart-list").append(errorMessage)
//   })
// }
