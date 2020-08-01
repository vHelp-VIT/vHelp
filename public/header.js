//variables
let phone640p = window.matchMedia("(max-width: 640px)")
let phone800p = window.matchMedia("(max-width: 800px)")
window.addEventListener("scroll", scrollNav);
window.addEventListener("scroll", scrollEnd);
window.setInterval(function(){
    if(!phone800p.matches){
        document.getElementById('colShow').style.display='none';
    }else if(phone800p.matches){
        document.getElementById('colShow').style.display='initial';
    }
},100);

//Random Color gen
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  //your code here
    var k = 0
$('#colShow').click(function(){
        
    if (phone640p.matches&& k==1) {
        $('.list-group').slideDown("slow", "linear");
        $('#colShow').css("transform", "rotateZ(0deg)");
        // document.getElementById("colShow").innerHTML = "Show";
        k=0
        //                    document.body.style.marginTop = "300px";
    }
    else if (phone640p.matches && k==0) {
        $('.list-group').slideUp("slow", "linear");
        $('#colShow').css("transform", "rotateZ(180deg)");
        // document.getElementById("colShow").innerHTML = "Collapse";
        k=1;
        //                    document.body.style.marginTop = "300px";
    }

});
//onscroll footer
function scrollEnd() {

}
//onscroll function
function scrollNav() {
    console.log($(window).scrollTop());
    $('.questContainer').css("z-index","6");
    if ($(window).scrollTop() > 30) {
        document.getElementById("customHead").style.boxShadow = "0 2px 4px 0 black";
        $('#customHead').css("background-color", "rgba(128, 80, 250,0.8)");
        $('.list-group').css("color", "rgba(128, 80, 250,0.6)");
        $('.questContainer').css("transform","translateY(-40px)");
    }
    else if ($(window).scrollTop() < 30) {
        document.getElementById("customHead").style.boxShadow = "0 0px 0px 0 black";
        $('body').css("background-color", "white");
        $('.questContainer').css("transform","translateY(40px)");
        $('#customHead').css("background-color", "rgba(128, 80, 250, 0)");
        $('.list-group').slideDown("slow");
        $('.questContainer').css("z-index","4");

    }

}
  $('#formContent').keydown(function(){
        var data = document.getElementById("formContent").value;
        console.log("dub db");
        if(data.length>10){
            $('#postQuest').css("display","initial");
            $('.questTags').css("display","initial");
        }if(data.length<10){
            $('#postQuest').css("display","None");
            $('.questTags').css("display","None");
        }
    });
//scrolltocontent
function scrollToContent(){
    document.getElementById("mainContent").scrollIntoView({ behavior: 'smooth', block: 'center' });
    
}
    function parallax(){
        $(".bannerStyle").css("transition","0.5");
        // $(".bannerStyle").css("transform","scale(1.2)");
        $(".bannerStyle").css("transition-duration","2s");
    }
    //carousel Images
    var images = ['campus-banner.jpg','vellorecampus.jpg','bhopalCampus.jpg','apcampus.jpeg']
    var i =0;
    window.onload = function(){
        //CARD RANDOM COLOR SETTER
            // $(".card").css("border-color", getRandomColor());
            var cards = document.getElementsByClassName('card');
            // console.log(cards[i]);
        for(let i=0; i<cards.length; i++){
          cards[i].style.borderColor = getRandomColor(); 
        }
       
        window.setInterval(function(){
        // console.log(i);
        // console.log("url('"+images[i]+"')");
        // $('.list-group-item').addClass("listItems");
        $('.bannerStyle').css("background","url('"+images[i]+"')");
            $('.bannerStyle').css("background-repeat","no-repeat");
            $('.bannerStyle').css("transition","3s");
            $('.bannerStyle').css("background-position","center");
            $('.bannerStyle').css("background-size","cover");
            // $('.bannerStyle').css("","100vh");
        i++;
        if(i==3){
            i=0;
        }
    },3000);
}
//ONclick card
$('.card').click(function(){
    console.log("trigg"+this);
    $(this).css("height","fit-content");
});
