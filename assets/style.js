var customHead = document.getElementById("customHead").style

window.addEventListener('scroll', function() {
    customHead.boxShadow = "0px 2px 4px 0px black";
    console.log($(window).scrollTop());
    if($(window).scrollTop() < 40){
        customHead.boxShadow = "0px 0px 0px 0px black";
        customHead.animationDelay = "2s"
    }
  });