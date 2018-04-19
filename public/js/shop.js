$(".content-wrap").on("click", ".add-to-cart", function(e){
  e.preventDefault()
  console.log(this.id)
  $.ajax({
    url: '/shop/add',
    type: "POST",
    data: {id: this.id},
  })
  .then(function(response){
    // display some animation to the screen
    $("#cartAdded")
      .html('<i class="icon-shopping-cart"></i>')
      .offset({ top: e.pageY - 15, left: e.pageX - 15})
      .animate({
        opacity: 1,
        top: "-=50"
      }, 400, "swing", function(){
        $("#cartAdded")
        .animate({
          top: "-=150",
          opacity: 0,
        }, 400)

      })
  })
  .catch(function(err){
    console.log(err)
  })
})
