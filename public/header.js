
preload(['loading.gif']);
document.getElementById("overlay").style.display = "block";
var dark = 0;
console.log(dark);
let phone640p = window.matchMedia("(max-width: 640px)")
let phone800p = window.matchMedia("(max-width: 800px)")
let phone980p = window.matchMedia("(max-width: 980px)")
window.addEventListener("scroll", scrollNav);
window.addEventListener("scroll", scrollEnd);
window.setInterval(function(){
    if(!phone800p.matches){
        document.getElementById('colShow').style.display='none';
    }else if(phone800p.matches){
        document.getElementById('colShow').style.display='initial';
    }
},100);
var drop = 0;
$('.dropDowns').click(function(){
    if(drop == 0){
    console.log("clicked");
    cardId = $(event.target).parent().parent();
    console.log(cardId);
    cardId.css("height","fit-content");
    cardId.children('.card-text').css("opacity","1");
    cardId.children('.card-text').css("display","block");
    $(event.target).css("transform","rotateZ(360deg)");
    drop = 1;
}
    else if(drop == 1){
    cardId.css("height","20px");
    cardId.children('.card-text').css("display","none");
    // $(event.target).css("transform","rotateZ(360deg)");
        drop=0;
    }
});
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
    if(dark == 0){
    $('.questContainer').css("z-index","6");
    if ($(window).scrollTop() > 30) {
        document.getElementById("customHead").style.boxShadow = "0 2px 4px 0 black";
        $('#customHead').css("background-color", "rgba(128, 80, 250,0.8)");
        
        $('.list-group').css("color", "rgba(128, 80, 250,0.6)");
        $('.questContainer').css("transform","translateY(-40px)");
        if(phone980p.matches){
        $('#customHead').css("background-color", "rgba(26, 39, 228, 0.726)");
        $('.list-group').css("color", "rgb(128, 80, 250)");
        $('.navList').css("background-color","rgba(26, 39, 228, 0.726)");
        $('.navList').css("border","1px solid white");
        $('.navList').css("width","110%");
        $('.navList').css("margin-left","-5%");
    }
    }
    else if ($(window).scrollTop() < 30) {
        document.getElementById("customHead").style.boxShadow = "0 0px 0px 0 black";
        $('body').css("background-color", "white");
        $('.questContainer').css("transform","translateY(40px)");
        $('#customHead').css("background-color", "rgba(128, 80, 250, 0)");
        $('.list-group').slideDown("slow");
        $('.questContainer').css("z-index","4");
        if(phone980p.matches){
        $('.navList').css("background-color","rgba(128, 80, 250,0.0)");
        $('.navList').css("border","none");}
    }}

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
    var images = ['vellorecampus.jpg','bhopalCampus.jpg','campus-banner.jpg','apcampus.jpeg']
    var images_phone = ['phone-campus-banner.jpg','vellorecampus.jpg','bhopalCampus.jpg','apcampus.jpeg']
    var i =0;
    window.onload = function(){
        if(phone800p){
            preload(images_phone);
       }else{
            preload(images);
       }
        //CARD RANDOM COLOR SETTER
            var cards = document.getElementsByClassName('card');
            var dropDowns = document.getElementsByClassName('dropDowns');
            // console.log(cards[i]);
        for(let i=0; i<cards.length; i++){
            let cl = getRandomColor();
          cards[i].style.borderColor = cl; 
          dropDowns[i].style.color = cl; 
        }
       //--------------------------
       //banner animation
       bannerAnimate();
       //----------------
    
    if ($(window).scrollTop() < 30) {
        $('.questContainer').css("transform","translateY(40px)");}
}
//ONclick card
$('.card').click(function(){
    console.log("trigg"+this);
    $(this).css("height","fit-content");
});
$(function() {
    console.log( "ready!" );
        setTimeout(() => {
    document.getElementById("overlay").style.display = "none";
    window.scrollTo(0, 0);
       }, 3000);

});
$('.images-main').oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
 //Banner Animation
 function bannerAnimate(){
 window.setInterval(function(){
    if(phone800p.matches){
        $('.bannerStyle').css("background","url('"+images_phone[i]+"')");
      }else{
        $('.bannerStyle').css("background","url('"+images[i]+"')");
      }
    $('.bannerStyle').css("background-repeat","no-repeat");
    $('.bannerStyle').css("transition","2s");
    $('.bannerStyle').css("background-position","center");
    $('.bannerStyle').css("background-size","cover");
    // $('.bannerStyle').css("","100vh");
i++;
if(i==4){
    i=0;
        }
    },3000);
}
//preload banner images
function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        console.log('preloading images');
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}
$('#askedQuest').click(darkMode);
function darkMode(){
    

card = document.getElementsByClassName("card");
cardBody = document.getElementsByClassName("card-body");
cardText = document.getElementsByClassName("card-text");
questCard = document.getElementsByClassName("questContainer");
listColor = document.getElementsByClassName("list-group-item");
if(dark == 0){
    document.body.style.backgroundColor="rgb(25, 24, 32)";
    document.getElementById("customHead").style.backgroundColor="rgb(25, 24, 32)";
    for(let j = 0; j<questCard.length; j++){
    questCard[j].style.backgroundColor ="rgb(25, 24, 32)";
    questCard[j].style.borderColor ="rgb(25, 24, 32)";
}
    // containers = document.getElementsByClassName('container');
    // for(let k=0;k<containers.length;k++){
    // containers[i].style.backgroundColor = "rgb(25, 24, 32)";
    // }
    $('textarea').css("background-color","rgb(25,24,32");
    $('textarea').css("color","white");
    for(let m=0;m<listColor.length;m++){
        listColor[m].style.backgroundColor = "rgb(25, 24, 32)";
    }
    for(let i =0;i<card.length;i++){
    $('.card-body').css("backgroud-color","rgb(25, 24, 32)");
    $('.card').css("backgroud-color","rgb(25, 24, 32)");
    $('.card-body').css("color","white");
    $('.card-text').css("backgroud-color","rgb(25, 24, 32)");
    $('.list-group-item').css("backgroud-color","rgb(25, 24, 32)");
    $('.list-group-item').css("color","white");
    card[i].style.backgroundColor = "rgb(25, 24, 32)";
    cardBody[i].style.backgroundColor = "rgb(25, 24, 32)";
    cardText[i].style.backgroundColor = "rgb(25, 24, 32)";
    }
    document.body.style.color = "white";
    dark =1;
    }
else{
    dark =0;
    document.body.style.backgroundColor="white";
    document.getElementById("customHead").style.backgroundColor="rgba(128, 80, 250,0.8)";
    $('.card-body').css("backgroud-color","white");
    $('.card').css("backgroud-color","rgb(25, 24, 32)");
    $('textarea').css("background-color","white");
    for(let m=0;m<listColor.length;m++){
        listColor[m].style.backgroundColor = "white";
    }
    for(let j = 0; j<questCard.length; j++){
    questCard[j].style.backgroundColor ="white";
    questCard[j].style.borderColor ="white";
}
    for(let i =0;i<card.length;i++){
        $('.card-body').css("backgroud-color","white");
        $('.card').css("backgroud-color","white");
        $('.card-body').css("color","black");
        $('.card-text').css("backgroud-color","white");
        card[i].style.backgroundColor = "white";
        cardBody[i].style.backgroundColor = "white";
        cardText[i].style.backgroundColor = "white";
    }
    $('.card-body').css("color","black");
    document.body.style.color = "black";
}
}