$(document).ready(function(){
  var images = [
    '/art_imgs/slideshow/resinman.jpeg',
    '/art_imgs/slideshow/nobody.jpeg',
    '/art_imgs/slideshow/bluemoon.jpeg',
    '/art_imgs/slideshow/3rdfloor.jpeg',
    '/art_imgs/slideshow/wildgoat.jpeg',
    '/art_imgs/slideshow/windowdrip.jpeg',
    '/art_imgs/slideshow/sf20.jpeg',
    '/art_imgs/slideshow/spacecase.jpeg'
  ]

  var imageElements = images.map(function(imgPath){
    var div = $("<div>").css("background-image", "url("+imgPath+")")
    return div;
  })
  imageElements.forEach(function(elem){
    console.log(elem)
    $("#slideshow").append(elem);
  })
  $("#slideshow > div:gt(0)").hide();
  setInterval(function() {
    $('#slideshow > div:first')
    .fadeOut(2700)
    .next()
    .fadeIn(3000)
    .end()
    .appendTo('#slideshow');
  },  5000)
})
