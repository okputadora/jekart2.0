// Add to cart
$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault()
  console.log("clicked'")
  var newItem = this.id
  // check for cart and cart items
  if (sessionStorage.getItem("cart") !== null){
    var cart = JSON.parse(sessionStorage.getItem("cart"))
    // check for duplicate items
    var duplicateFound = false;
    cart.forEach(function(item){
      if (item == newItem){
        // create a modal informing user of duplicate
        duplicateFound = true;
        return;
      }
    })
    if (duplicateFound === false){
      // add to cart
      cart.push(newItem)
      sessionStorage.setItem("cart", JSON.stringify(cart))
      animateCart(e)
    }
  }
  else{
    sessionStorage.setItem("cart", JSON.stringify([this.id]))
    animateCart(e)
  }
})


function animateCart(e){
  $("#cartAdded")
    .html('<i class="icon-shopping-cart"></i>')
    .offset({ top: e.pageY - 15, left: e.pageX - 15})
    .animate({opacity: 1,top: "-=50"}, 400, "swing", function(){
      $("#cartAdded")
      .animate({
        top: "-=150",
        opacity: 0,
      }, 400)
    })
  }

console.log(window.location.href)
if (window.location.href === "http://localhost:3000/shop/cart"){
  $.ajax({
    url: 'buildCart',
    type: 'POST',
    data: {cart: sessionStorage.getItem("cart")}
  })
  .then(function(cart){
    console.log(cart)
    cart.forEach(function(item){
      item = item[0]
      var tableRow = $("<tr>").addClass("cart_item")
      var removeIcon = $("<td>").addClass("cart-product-remove")
        .append('<a href="#" class="remove" title="Remove this item"><i class="icon-trash2"></i></a>')
      var itemImage = $("<td>")
        .append('<a href="#"><img class="custom-thumb" src="../art_imgs/prints/'+item.image1 + '" alt="'+ item.name +'"></a>')
      var itemName = $("<td>").addClass("cart-product-name")
        .append('<a>'+item.name+'</a>')
      var itemPrice = $("<td>").addClass("cart-product-price")
        .append('<span class="amount">$'+item.price1+'</span>')
      var itemQuantity= $("<td>").addClass("cart-product-quantity")
      var counter = $("<div>").addClass("quantity")
        counter.append('<input type="button" value="-" class="minus">')
        .append('<input type="text" name="quantity" value="1" class="qty" />')
        .append('<input type="button" value="+" class="plus">')
      itemQuantity.append(counter)
      var itemTotal = $("<td>").addClass("cart-product-subtotal")
        .append('<span class="amount">$'+item.price1+'</span>')
      tableRow.append(removeIcon, itemImage, itemName, itemPrice, itemQuantity, itemTotal);
      $("#cart-list").append(tableRow)
    })
  })
  .catch(function(err){
    console.log("error")
    var tableRow = $("<tr>").addClass("cart_item")
    var errorMessage = $("<p>").addClass("text-center")
      .html("There doesn't appear to be anything in your cart yet")
    tableRow.append(errorMessage)
    $("#cart-list").append(errorMessage)
  })
}
