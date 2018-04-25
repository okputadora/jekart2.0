$(document).ready(function(){
  console.log("ready")
  var unframedPrice = parseInt($("#main-price").html().slice(1));
  var framedPrice = parseInt($("#framed-price").html().slice(3));
  if ($("#cart-count").html()){
    var cartCount = parseInt($("#cart-count").html().slice(1));
  }else{cartCount = 0;}
  console.log(cartCount)
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
    cartCount += parseInt(qty)
    console.log(cartCount)
    // update the display cart
    $("#cart-count").html("+" + cartCount)

    // update the cart on the server
    $.ajax({
      url: '/shop/addToCart',
      type: 'POST',
      data: {id: this.id, qty: qty, framed: framed}
    })
    .then(function(resp){
      animateCartOut()
    })
  })
  // framing toggle
  $("#switch-toggle-2").on("click", function(){
    if ($("#switch-toggle-2").is(":checked")){
      var newTotal = framedPrice + unframedPrice;
      $(".product-price").html("$" + newTotal);
      $(".discount-price").html("$15 discount for local pickup");
    }
    else{
      $(".product-price").html("$"+unframedPrice);
      $(".discount-price").html("$5 discount for local pickup");
    }
  })

  // change qunatiies
  $(".content-wrap").on("click", ".plus", function(){
    console.log("Cluick")
    var id = this.id;
    qtyId = id.slice(id.indexOf("-") + 1);
    var val = $("#qty-"+qtyId).val();
    val = parseInt(val) + 1
    $("#qty-"+qtyId).val(val)
  })
  $(".content-wrap").on("click", ".minus", function(){
    var id = this.id
    qtyId = id.slice(id.indexOf("-") + 1);
    var val = $("#qty-"+qtyId).val()
    if (val > 1){
      val = parseInt(val) - 1
      $("#qty-"+qtyId).val(val)
    }
  })

  $(".content-wrap").on("click", ".edit", function(){
    $("#update-cart").prop("disabled", false);
    $("#checkout").prop("disabled", true);
  })

  $(".content-wrap").on("click", ".remove", function(){
    console.log("HELLO")
    id = this.id;
    removeId = id.slice(id.indexOf("-") + 1);
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
      var qty = $("#qty-" +id).val();
      var framed = $("#framed-"+id).is(":checked");
      // strip the display id
      if (id.indexOf("_") > -1){
        id = id.slice(0, id.indexOf("_"));
      }
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


})
