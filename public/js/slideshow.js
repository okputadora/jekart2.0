var images = [
  '/art_imgs/slideshow/resinman.png',
  '/art_imgs/slideshow/nobody.png',
  '/art_imgs/slideshow/bluemoon.png',
  '/art_imgs/slideshow/3rdfloor.png',
  '/art_imgs/slideshow/wildgoat.png',
  '/art_imgs/slideshow/windowdrip.png',
  '/art_imgs/slideshow/sf20.png',
  '/art_imgs/slideshow/spacecase.png'
]

var imageElements = images.map(function(imgPath){
  var div = $("<div>").css("background-image", "url("+imgPath+")")
  return div;
})
imageElements.forEach(function(elem){
  console.log(elem)
  $("#slideshow").append(elem);
})
$(document).ready(function(){
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
