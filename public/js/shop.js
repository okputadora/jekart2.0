$(document).ready(function(){
  var CART_COUNT;
  if ($("#main-price").html()){
    var unframedPrice = parseInt($("#main-price").html().slice(1));
    var framedPrice = parseInt($("#framed-price").html().slice(3));
  }
  if ($("#cart-count").html()){
    CART_COUNT = parseInt($("#cart-count").html());
  }else{CART_COUNT = 0;}
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
    CART_COUNT += parseInt(qty)
    // update the display cart
    $("#cart-count").html(CART_COUNT)
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
    updateCart();
  })

  $(".content-wrap").on("click", ".remove", function(){
    id = this.id;
    removeId = id.slice(id.indexOf("-") + 1);
    $("#"+removeId).remove()
    updateCart();
  })

  function updateCart(){
    // grab the items in the cart
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
    }).then(function(cart){
      CART_COUNT = 0;
      // rebuild the cart
      $("#cart-list").html("");
      cart.forEach(function(item){
        // update the cart count
        CART_COUNT += item.qty
        var tr = $("<tr>")
          .addClass("cart_item")
          .attr("id", item.id);
        var remove = $("<td>").addClass("cart-product-remove");
        var removeLink = $("<a>")
          .addClass("remove")
          .attr("id", "remove-" + item.id)
          .html('<i class="icon-trash2"></i>');
        remove.append(removeLink);
        var image = $("<td>").addClass("cart-product");
        var imageLink = $("<img>")
          .addClass("custom-thumb")
          .attr("src", "/art_imgs/prints/" + item.image)
          .attr("alt", item.name);
        image.append(imageLink);
        var name = $("<td>")
          .addClass("cart-product-name")
          .html("<a>"+item.name+"</a>");
        var framed = $("<td>").addClass("cart-product-framed");
        var toggle = $("<div>").addClass("switch");
        var toggleSwitch = $("<input>")
          .addClass("switch-toggle switch-rounded-mini switch-toggle-round edit");
        toggleSwitch
          .attr("id", "framed-" + item.id)
          .attr("type", "checkbox")
        if (item.framed === "checked"){
          toggleSwitch.prop("checked", "true");
        }
        var toggleLabel = $("<label>").attr("for", "framed-" + item.id);
        toggle.append(toggleSwitch, toggleLabel);
        framed.append(toggle);
        var price = $("<td>").addClass("cart-product-price")
        var priceVal = $("<span>")
          .addClass("amount")
          .attr("id", "amount-"+item.id)
          .html("$" + item.price)
        price.append(priceVal);
        var qty = $("<td>").addClass("cart-product-quantity")
        var qtyBtn = $("<div>").addClass("quantity clearfix")
        var minusBtn = $("<input>")
          .addClass("minus edit")
          .attr("id", "minus-" + item.id)
          .attr("type", "button")
          .attr("value", "-");
        var qtyVal = $("<input>")
          .addClass("qty")
          .attr("id", "qty-"+item.id)
          .attr("step", 1)
          .attr("min", "1")
          .attr("name", "quantity")
          .attr("value", item.qty)
          .attr("readonly", "true");
        var plusBtn = $("<input>")
          .addClass("plus edit")
          .attr("id", "plus-" + item.id)
          .attr("value", "+")
          .attr("type", "button");
        qtyBtn.append(minusBtn, qtyVal, plusBtn)
        qty.append(qtyBtn)
        var subtotal = $("<td>").addClass("cart-product-subtotal")
        var subTotAmt = $("<span>").addClass("amount")
          .attr("id", "total-"+item.id).html("$"+item.total)
        subtotal.append(subTotAmt)
        tr.append(remove, image, name, framed, price, qty, subtotal)
        $("#cart-list").append(tr)
      })
      $("#cart-count").html(CART_COUNT)
    })
  }

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
