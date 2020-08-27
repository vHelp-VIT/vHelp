
preload(['loading.gif']);
try{
document.getElementById("overlayId").style.display = "block";}
catch(e){
    
}
var dark = 0;
// console.log(dark);
let phone640p = window.matchMedia("(max-width: 640px)")
let phone800p = window.matchMedia("(max-width: 800px)")
let phone980p = window.matchMedia("(max-width: 980px)")
window.addEventListener("scroll", scrollNav);
window.addEventListener("scroll", scrollEnd);
// jQuery.get('https://raw.githubusercontent.com/karanysingh/casual_work/b897cb7912017a02382aa238cf090a469a59bcfa/images.txt', function(data) {
//     // console.log(data);
//     var images = data
//     //process text file line by line
//     $('#div').html(data.replace('n',''));
//  });
 jQuery.get('https://raw.githubusercontent.com/karanysingh/casual_work/master/drivepehosted.txt', function(data) {
    console.log(data);
    var drivepehosted = data
    $('#drivepehosted').append(drivepehosted);
    //process text file line by line
    $('#div').html(data.replace('n',''));
 });
//---------


window.setInterval(function(){
    try{
    if(!phone800p.matches){
        document.getElementById('colShow').style.display='none';
    }else if(phone800p.matches){
        document.getElementById('colShow').style.display='initial';
    }}
    catch(e){
        // console.log(e);
    }
},100);
var drop = 0;
$('.dropDowns').click(function(){
    if(drop == 0){
    // console.log("clicked");
    cardId = $(event.target).parent().parent();
    // console.log(cardId);
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
//sidebar 

var hidesignal = 0;

function sidebarHide(){
    // console.log("trig");
    if(hidesignal == 0){
        hidesignal = 1;
        $('.side').css("width","initial");
    }else{
        // hidesignal = 0;
    }
}
$(".hideSidebar").click(()=>{
    $('.side').css("width","0px");
    $('.hideSidebar').css("width","initial");
    hidesignal = 1;
});
//onscroll function
function scrollNav() {
    // console.log($(window).scrollTop());
    if(dark == 0){
    $('.questContainer').css("z-index","6");
    if ($(window).scrollTop() > 30) {
        sidebarHide();
        document.getElementById("customHead").style.boxShadow = "0 2px 4px 0 black";
        $('#customHead').css("background-color", "rgba(128, 80, 250,0.8)");
        // sidebarHide();
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
        $('.side').css("width","0px");
        hidesignal = 0;
        $('.questContainer').css("transform","translateY(40px)");
        $('#customHead').css("background-color", "rgba(128, 80, 250, 0)");
        $('.list-group').slideDown("slow");
        $('.questContainer').css("z-index","4");
        if(phone980p.matches){
        $('.navList').css("background-color","rgba(128, 80, 250,0.0)");
        $('.navList').css("border","none");}
    }
}else {
    if ($(window).scrollTop() > 30) {
        document.getElementById("customHead").style.boxShadow = "0 2px 4px 0 black";
        $('.list-group').css("color", "rgba(128, 80, 250,0.6)");
        sidebarHide();
        $('.questContainer').css("transform","translateY(-40px)");
        $('#customHead').css("background-color", "rgb(25,24,32)");
        if(phone980p.matches){
        $('.list-group').css("color", "rgb(128, 80, 250)");
        $('.navList').css("background-color","rgb(25, 24, 32)");
        $('.navList').css("border","1px solid white");
        $('.navList').css("width","110%");
        $('.navList').css("margin-left","-5%");
    }
    }
    else if ($(window).scrollTop() < 30) {
        document.getElementById("customHead").style.boxShadow = "0 0px 0px 0 black";
        $('.questContainer').css("transform","translateY(40px)");
        $('.side').css("width","0px");
        hidesignal = 0;
        $('#customHead').css("background-color", "rgba(128, 80, 250, 0)");
        $('.list-group').slideDown("slow");
        $('.questContainer').css("z-index","4");
        if(phone980p.matches){
        $('.navList').css("background-color","rgba(128, 80, 250,0.0)");
        $('.navList').css("border","none");}
    }
}

}
  $('#formContent').keydown(function(){
        var data = document.getElementById("formContent").value;
        // console.log("dub db");
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
    var images = ['vellorecampus.jpg','bhopalCampus.jpg','campus-banner.jpg','apcampus.jpeg','footer-back.png']
    var images_phone = ['phone-campus-banner.jpg','vellorecampus.jpg','bhopalCampus.jpg','apcampus.jpeg','footer-back.png']
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
          try{
          dropDowns[i].style.color = cl; }
          catch(e){
              console.log(e);
          }
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
    // console.log("trigg"+this);
    $(this).css("height","fit-content");
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
        // console.log('preloading images');
        $('<img />').attr('src',this).appendTo('body').css('display','none');
            console.log( "ready!" );
                setTimeout(() => {
                    try{
            document.getElementById("overlayId").style.display = "none";}
            catch(e){
        
            }
            window.scrollTo(0, 0);
               }, 2000);
        
    });
}
$('#darkMode').click(darkMode);
function darkMode(){
    
card = document.getElementsByClassName("card");
cardBody = document.getElementsByClassName("card-body");
cardText = document.getElementsByClassName("card-text");
questCard = document.getElementsByClassName("questContainer");
listColor = document.getElementsByClassName("list-group-item");
forms = document.getElementsByClassName("form-control");
try{
askedQuest = document.getElementById("askedQuest");}
catch(e){

}
if(dark == 0){
    document.body.style.backgroundColor="rgb(25, 24, 32)";
    document.getElementById("customHead").style.backgroundColor="rgba(128, 80, 250, 0)";
    try{
    askedQuest.style.backgroundColor = "rgb(128, 80, 250)";}
    catch(e){}
    for(let j = 0; j<questCard.length; j++){
    questCard[j].style.backgroundColor ="rgb(25, 24, 32)";
    questCard[j].style.borderColor ="rgb(25, 24, 32)";
    questCard[j].style.boxShadow ="0 2px 4px 0 rgb(255, 193, 7)";
}
    // containers = document.getElementsByClassName('container');
    // for(let k=0;k<containers.length;k++){
    // containers[i].style.backgroundColor = "rgb(25, 24, 32)";
    // }
    $('textarea').css("background-color","rgb(25,24,32)");
    $('textarea').css("color","white");
    $('textarea').css("border-color","rgb(25,24,32)");
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
    try{
    cardText[i].style.backgroundColor = "rgb(25, 24, 32)";
}
    catch(e){
        console.log(e);
    }
    }
    try{
    document.getElementById("mailArea").style.backgroundColor = "rgb(255, 193, 7)";
    document.getElementById("mailArea").style.color = "white";
    document.getElementById("mailArea").style.borderColor = "";
}
    catch(e){
        console.log(e);
    }
    try{
        for(let j=0;j<forms.length;j++){
            forms[j].style.backgroundColor = "rgb(25, 24, 32)";
            forms[j].style.color = "white";
        }
    }catch(e){

    }
    document.body.style.color = "white";
    dark =1;
    document.getElementById("darkMode").style.backgroundColor="white";
    }
else{
    dark =0;
    document.body.style.backgroundColor="white";
    try{
    askedQuest.style.backgroundColor = "rgb(128, 80, 250)";
    askedQuest.style.color = "white";}
    catch(e){

    }
    document.getElementById("customHead").style.backgroundColor="rgba(128, 80, 250,0.8)";
    $('.card-body').css("backgroud-color","white");
    $('.card').css("backgroud-color","rgb(25, 24, 32)");
    $('textarea').css("background-color","white");
    $('textarea').css("border-color","white");
    $('.list-group-item').css("color","blue");
    
    try{
        for(let j=0;j<forms.length;j++){
            forms[j].style.backgroundColor = "white";
            forms[j].style.color = "black";
        }
    }catch(e){
        
    }
    for(let m=0;m<listColor.length;m++){
        listColor[m].style.backgroundColor = "white";
    }
    for(let j = 0; j<questCard.length; j++){
    questCard[j].style.backgroundColor ="white";
    questCard[j].style.borderColor ="white";
    questCard[j].style.boxShadow ="0 2px 4px 0 black";
}
    for(let i =0;i<card.length;i++){
        $('.card-body').css("backgroud-color","white");
        $('.card').css("backgroud-color","white");
        $('.card-body').css("color","black");
        $('.card-text').css("backgroud-color","white");
        card[i].style.backgroundColor = "white";
        cardBody[i].style.backgroundColor = "white";
        try{
        cardText[i].style.backgroundColor = "white";}
        catch(e){
            console.log(e);
        }
    }
    $('.card-body').css("color","black");
    document.body.style.color = "black";
    document.getElementById("darkMode").style.backgroundColor="rgb(25,24,32)";
}
}
// Calculate chennai fees
function calculateFee(){
    totalFee = 0;
    if($("[data-type=grpA]").attr("isOn")==1){
        if($("[data-type=cat1]").attr("isOn")==1){
            totalFee = totalFee + 176000;
        }
        else if($("[data-type=cat2]").attr("isOn")==1){
            totalFee = totalFee + 276000;
        }
        else if($("[data-type=cat3]").attr("isOn")==1){
            totalFee = totalFee + 376000;
        }
        else if($("[data-type=cat4]").attr("isOn")==1){
            totalFee = totalFee + 476000;
        }
        else if($("[data-type=cat5]").attr("isOn")==1){
            totalFee = totalFee + 576000;
        }
    }else if($("[data-type=grpB]").attr("isOn")==1){
        if($("[data-type=cat1]").attr("isOn")==1){
            totalFee = totalFee + 198000;
        }
        else if($("[data-type=cat2]").attr("isOn")==1){
            totalFee = totalFee + 298000;
        }
        else if($("[data-type=cat3]").attr("isOn")==1){
            totalFee = totalFee + 398000;
        }
        else if($("[data-type=cat4]").attr("isOn")==1){
            totalFee = totalFee + 498000;
        }
        else if($("[data-type=cat5]").getAttribute("isOn")==1){
            totalFee = totalFee + 598000;
        }
    }
    if($("[data-type=two]").attr("isOn")==1){
        totalFee = totalFee + 129600;
    }
    else if($("[data-type=three]").attr("isOn")==1){
        totalFee = totalFee + 121000;
    }
    else if($("[data-type=four]").attr("isOn")==1){
        totalFee = totalFee + 116500;
    }
    else if($("[data-type=twonac]").attr("isOn")==1){
        totalFee = totalFee + 82800;
    }
    else if($("[data-type=threenac]").attr("isOn")==1){
        totalFee = totalFee + 76900;
    }
    else if($("[data-type=fournac]").attr("isOn")==1){
        totalFee = totalFee + 70500;
    }
    if($("[data-type=veg]").attr("isOn")==1){
        totalFee = totalFee + 59950;
    }
    else if($("[data-type=nonveg]").attr("isOn")==1){
        totalFee = totalFee + 66850;
    }
    else if($("[data-type=special]").attr("isOn")==1){
        totalFee = totalFee + 76500;
    }
    else if($("[data-type=foodpark]").attr("isOn")==1){
        totalFee = totalFee + 76500;
    }
    document.getElementById("totalFee").innerHTML = '<i style="color: blue;"class="fa fa-inr" aria-hidden="true"></i> ' + totalFee.toLocaleString();
    totalFee = 0;
}
//Calculate vellore fees
function calculateFeeVel(){
    vtotalFee = 0;
    if($("[data-type=vgrpA]").attr("isOn")==1){
        if($("[data-type=vcat1]").attr("isOn")==1){
            vtotalFee = vtotalFee + 176000;
        }
        else if($("[data-type=vcat2]").attr("isOn")==1){
            vtotalFee = vtotalFee + 276000;
        }
        else if($("[data-type=vcat3]").attr("isOn")==1){
            vtotalFee = vtotalFee + 376000;
        }
        else if($("[data-type=vcat4]").attr("isOn")==1){
            vtotalFee = vtotalFee + 476000;
        }
        else if($("[data-type=vcat5]").attr("isOn")==1){
            vtotalFee = vtotalFee + 576000;
        }
    }else if($("[data-type=vgrpB]").attr("isOn")==1){
        if($("[data-type=vcat1]").attr("isOn")==1){
            vtotalFee = vtotalFee + 198000;
        }
        else if($("[data-type=vcat2]").attr("isOn")==1){
            vtotalFee = vtotalFee + 298000;
        }
        else if($("[data-type=vcat3]").attr("isOn")==1){
            vtotalFee = vtotalFee + 398000;
        }
        else if($("[data-type=vcat4]").attr("isOn")==1){
            vtotalFee = vtotalFee + 498000;
        }
        else if($("[data-type=vcat5]").attr("isOn")==1){
            vtotalFee = vtotalFee + 598000;
        }
    }
    if($("[data-type=vone]").attr("isOn")==1){
        vtotalFee = vtotalFee + 122840;
    }
    else if($("[data-type=vtwo]").attr("isOn")==1){
        vtotalFee = vtotalFee + 97240;
    }
    else if($("[data-type=vthree]").attr("isOn")==1){
        vtotalFee = vtotalFee + 90840;
    }
    else if($("[data-type=vfour]").attr("isOn")==1){
        vtotalFee = vtotalFee + 81140;
    }
    else if($("[data-type=vsix]").attr("isOn")==1){
        vtotalFee = vtotalFee + 74640;
    }
    else if($("[data-type=vonenac]").attr("isOn")==1){
        vtotalFee = vtotalFee + 85740;
    }
    else if($("[data-type=vtwonac]").attr("isOn")==1){
        vtotalFee = vtotalFee + 72040;
    }
    else if($("[data-type=vthreenac]").attr("isOn")==1){
        vtotalFee = vtotalFee + 65940;
    }
    else if($("[data-type=vfournac]").attr("isOn")==1){
        vtotalFee = vtotalFee + 60940;
    }
    else if($("[data-type=vsixnac]").attr("isOn")==1){
        vtotalFee = vtotalFee + 57240;
    }
    if($("[data-type=vveg]").attr("isOn")==1){
        vtotalFee = vtotalFee + 50500;
    }
    else if($("[data-type=vnonveg]").attr("isOn")==1){
        vtotalFee = vtotalFee + 57000;
    }
    else if($("[data-type=vspecial]").attr("isOn")==1){
        vtotalFee = vtotalFee + 65000;
    }
    document.getElementById("vtotalFee").innerHTML = '<i style="color: blue;"class="fa fa-inr" aria-hidden="true"></i> ' + vtotalFee.toLocaleString();
    vtotalFee = 0;
}
//Calculate bhopal fees
function calculateFeeBho(){
    btotalFee = 0;
    // console.log("Fee");
    if($("[data-type=bgrpA]").attr("isOn")==1){
        if($("[data-type=bcat1]").attr("isOn")==1){
            btotalFee = btotalFee + 176000;
        }
        else if($("[data-type=bcat2]").attr("isOn")==1){
            btotalFee = btotalFee + 276000;
        }
        else if($("[data-type=bcat3]").attr("isOn")==1){
            btotalFee = btotalFee + 376000;
        }
        else if($("[data-type=bcat4]").attr("isOn")==1){
            btotalFee = btotalFee + 476000;
        }
        else if($("[data-type=bcat5]").attr("isOn")==1){
            btotalFee = btotalFee + 576000;
        }
    }else if($("[data-type=bgrpB]").attr("isOn")==1){
        if($("[data-type=bcat1]").attr("isOn")==1){
            btotalFee = btotalFee + 198000;
        }
        else if($("[data-type=bcat2]").attr("isOn")==1){
            btotalFee = btotalFee + 298000;
        }
        else if($("[data-type=bcat3]").attr("isOn")==1){
            btotalFee = btotalFee + 398000;
        }
        else if($("[data-type=bcat4]").attr("isOn")==1){
            btotalFee = btotalFee + 498000;
        }
        else if($("[data-type=bcat5]").attr("isOn")==1){
            btotalFee = btotalFee + 598000;
        }
    }
    if($("[data-type=bone]").attr("isOn")==1){
        btotalFee = btotalFee + 193925;
    }
    else if($("[data-type=btwo]").attr("isOn")==1){
        btotalFee = btotalFee + 175050;
    }
    else if($("[data-type=bthree]").attr("isOn")==1){
        btotalFee = btotalFee + 159775;
    }
    else if($("[data-type=bfour]").attr("isOn")==1){
        btotalFee = btotalFee + 139950;
    }
    else if($("[data-type=bsix]").attr("isOn")==1){
        btotalFee = btotalFee + 134925;
    }
    else if($("[data-type=bonenac]").attr("isOn")==1){
        btotalFee = btotalFee + 172075;
    }
    else if($("[data-type=btwonac]").attr("isOn")==1){
        btotalFee = btotalFee + 156850;
    }
    else if($("[data-type=bthreenac]").attr("isOn")==1){
        btotalFee = btotalFee + 142425;
    }
    else if($("[data-type=bfournac]").attr("isOn")==1){
        btotalFee = btotalFee + 127975;
    }
    else if($("[data-type=bsixnac]").attr("isOn")==1){
        btotalFee = btotalFee + 123800;
    }
    if($("[data-type=bveg]").attr("isOn")==1){
        btotalFee = btotalFee + 0;
    }
    else if($("[data-type=bnonveg]").attr("isOn")==1){
        btotalFee = btotalFee + 0;
    }
    else if($("[data-type=bspecial]").attr("isOn")==1){
        btotalFee = btotalFee + 0;
    }
    document.getElementById("btotalFee").innerHTML = '<i style="color: blue;"class="fa fa-inr" aria-hidden="true"></i> ' + btotalFee.toLocaleString();
    btotalFee = 0;
}

//Calculate bhopal fees
function calculateFeeAmr(){
    atotalFee = 0;
    // console.log("Fee");
    if($("[data-type=agrpA]").attr("isOn")==1){
        if($("[data-type=acat1]").attr("isOn")==1){
            atotalFee = atotalFee + 176000;
        }
        else if($("[data-type=acat2]").attr("isOn")==1){
            atotalFee = atotalFee + 276000;
        }
        else if($("[data-type=acat3]").attr("isOn")==1){
            atotalFee = atotalFee + 376000;
        }
        else if($("[data-type=acat4]").attr("isOn")==1){
            atotalFee = atotalFee + 476000;
        }
        else if($("[data-type=acat5]").attr("isOn")==1){
            atotalFee = atotalFee + 576000;
        }
    }else if($("[data-type=agrpB]").attr("isOn")==1){
        if($("[data-type=acat1]").attr("isOn")==1){
            atotalFee = atotalFee + 198000;
        }
        else if($("[data-type=acat2]").attr("isOn")==1){
            atotalFee = atotalFee + 298000;
        }
        else if($("[data-type=acat3]").attr("isOn")==1){
            atotalFee = atotalFee + 398000;
        }
        else if($("[data-type=acat4]").attr("isOn")==1){
            atotalFee = atotalFee + 498000;
        }
        else if($("[data-type=acat5]").attr("isOn")==1){
            atotalFee = atotalFee + 598000;
        }
    }
    if($("[data-type=atwo]").attr("isOn")==1){
        atotalFee = atotalFee + 113000;
    }
    else if($("[data-type=a2baptac]").attr("isOn")==1){
        atotalFee = atotalFee + 125000;
    }
    else if($("[data-type=afour]").attr("isOn")==1){
        atotalFee = atotalFee + 102000;
    }
    else if($("[data-type=a2baptnac]").attr("isOn")==1){
        atotalFee = atotalFee + 85000;
    }
    else if($("[data-type=a4baptac]").attr("isOn")==1){
        atotalFee = atotalFee + 115000;
    }
    else if($("[data-type=atwonac]").attr("isOn")==1){
        atotalFee = atotalFee + 73000;
    }
    else if($("[data-type=a2baptnac]").attr("isOn")==1){
        atotalFee = atotalFee + 85000;
    }
    else if($("[data-type=afournac]").attr("isOn")==1){
        atotalFee = atotalFee + 62000;
    }
    if($("[data-type=aveg]").attr("isOn")==1){
        atotalFee = atotalFee + 59000;
    }
    else if($("[data-type=anonveg]").attr("isOn")==1){
        atotalFee = atotalFee + 66000;
    }
    else if($("[data-type=aspecial]").attr("isOn")==1){
        atotalFee = atotalFee + 72500;
    }
    document.getElementById("atotalFee").innerHTML = '<i style="color: blue;"class="fa fa-inr" aria-hidden="true"></i> ' + atotalFee.toLocaleString();
    atotalFee = 0;
}
//Fee Buttons
$('.cat').click(()=>{
    // console.log(event.target.getAttribute("data-type"));
    // console.log(isFee);
    if(event.target.getAttribute("isOn")==1){
    $(event.target).css("border","2px solid rgb(238, 234, 19)");
    $(event.target).css("background-color","white");
    $(event.target).css("color","black");
    event.target.setAttribute("isOn",0);
    }
    else if(event.target.getAttribute("isOn")==0){
    $(event.target).css("border","2px solid rgb(238, 234, 19)");
    $(event.target).css("background-color","rgb(238, 234, 19)");
    $(event.target).css("color","white");
    event.target.setAttribute("isOn",1);
    }
});
$('.room').click(()=>{
    // console.log(event.target.getAttribute("data-type"));
    // console.log(isFee);
    if(event.target.getAttribute("isOn")==1){
    $(event.target).css("border","2px solid rgb(170, 86, 30)");
    $(event.target).css("background-color","white");
    $(event.target).css("color","black");
    event.target.setAttribute("isOn",0);
    }
    else if(event.target.getAttribute("isOn")==0){
    $(event.target).css("border","2px solid rgb(170, 86, 30)");
    $(event.target).css("background-color","rgb(170, 86, 30)");
    $(event.target).css("color","white");
    event.target.setAttribute("isOn",1);
    }
});
$('.mess').click(()=>{
    // console.log(event.target.getAttribute("data-type"));
    // console.log(isFee);
    if(event.target.getAttribute("isOn")==1){
    $(event.target).css("border","2px solid rgb(201, 118, 24)");
    $(event.target).css("background-color","white");
    $(event.target).css("color","black");
    event.target.setAttribute("isOn",0);
    }
    else if(event.target.getAttribute("isOn")==0){
    $(event.target).css("border","2px solid rgb(201, 118, 24)");
    $(event.target).css("background-color","rgb(201, 118, 24)");
    $(event.target).css("color","white");
    event.target.setAttribute("isOn",1);
    }
});
$('.grp').click(()=>{
    // console.log(event.target.getAttribute("data-type"));
    // console.log(isFee);
    if(event.target.getAttribute("isOn")==1){
    $(event.target).css("border","2px solid rgb(128, 80, 250)");
    $(event.target).css("background-color","white");
    $(event.target).css("color","black");
    event.target.setAttribute("isOn",0);
    }
    else if(event.target.getAttribute("isOn")==0){
    $(event.target).css("border","2px solid rgb(128, 80, 250)");
    $(event.target).css("background-color","rgb(128, 80, 250)");
    $(event.target).css("color","white");
    event.target.setAttribute("isOn",1);
    }
});
$(".vel").click(()=>{ 
    // console.log("Velloe Clicked");
    calculateFeeVel();
});

$(".che").click(()=>{ 
    // console.log("Velloe Clicked");
    calculateFee();
});

$(".bho").click(()=>{ 
    // console.log("Velloe Clicked");
    calculateFeeBho();
});
$(".amr").click(()=>{ 
    // console.log("Velloe Clicked");
    calculateFeeAmr();
});
//---------
var totalFee = 0;
var vtotalFee = 0;
var btotalFee = 0;
var atotalFee = 0;
//Calculate Fee Ends here--------
$(".images-main").click(()=>{
    var src = $(event.target).attr("src"); 
    var overlay = document.getElementById("overlayId");
    var overlayId = document.getElementById("overlay");
    var overlaybanner = document.getElementById("loadLogo");
    // console.log(src);
    if(phone800p){
        console.log("max 800px");
    $("#loadLogo").attr("src","https://img.icons8.com/cotton/128/000000/cancel--v1.png");
    overlaybanner.style.width="70px";
    // overlaybanner.style.marginRight = "-1000px";
    // overlaybanner.style.marginTop = "-0px";
    overlaybanner.style.position = "fixed";
    overlay.style.boxShadow = "0 1px 500px 0 white";
    overlaybanner.style.boxShadow = "0 2px 4px 0 black";
    overlaybanner.style.backgroundColor = "white";
    overlaybanner.style.borderRadius = "5em";
    overlay.style.zIndex = "7";
    overlayId.style.background ="url('"+src+"')";
    overlayId.style.backgroundSize = "contain";
    overlayId.style.backgroundRepeat = "no-repeat";
    overlayId.style.backgroundPosition = "center";
    overlay.style.display = "block";
    }
    if(phone800p.matches){
        
    overlaybanner.style.bottom = "10%";
    overlayId.style.opacity = "1";
    overlaybanner.style.right ="40%";
    }else{
        overlaybanner.style.marginTop="70px";
        overlayId.style.opacity = "1";
    overlaybanner.style.right = "0";
    overlaybanner.style.top ="0";
    }

});
$("#loadLogo").click(()=>{
    document.getElementById("overlayId").style.display = "none";
});
