//variables
let phone640p = window.matchMedia("(max-width: 640px)")
  
window.addEventListener("scroll", scrollNav);
window.addEventListener("load", parallax);
  //your code here

//onscroll function
function scrollNav() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > 30) {
        document.getElementById("customHead").style.boxShadow = "0 2px 4px 0 black";
        $('#customHead').css("background-color", "rgba(128, 80, 250,0.8)");
        $('.list-group').css("color", "rgba(128, 80, 250,0.6)");
    }
    if ($(window).scrollTop() > 620 && phone640p.matches) {
        $('.list-group').slideUp("slow", "linear");
        //                    document.body.style.marginTop = "300px";
    }
    if ($(window).scrollTop() < 30) {
        document.getElementById("customHead").style.boxShadow = "0 0px 0px 0 black";
        $('body').css("background-color", "white");
        $('#customHead').css("background-color", "rgba(128, 80, 250,0)");
        $('.list-group').slideDown("slow");

    }

    if ($(window).scrollTop() < 620 && phone640p.matches) {
        $('.list-group').slideDown("slow", "linear");
        //                    document.body.style.marginTop = "300px";
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
    window.setInterval(function(){
        console.log(i);
        console.log("url('"+images[i]+"')");
        $('.bannerStyle').css("background","url('"+images[i]+"')");
            $('.bannerStyle').css("background-repeat","no-repeat");
            $('.bannerStyle').css("background-position","center");
            $('.bannerStyle').css("background-size","cover");
            // $('.bannerStyle').css("","100vh");
        i++;
        if(i==3){
            i=0;
        }
    },3000);
    // window.setInterval(function(){
    //     window.setTimeout(function(){
            // $('.bannerStyle').css("background","url('campus-banner.jpeg')");
    //         $('.bannerStyle').css("background-repeat","no-repeat");
    //     },000);
    //     window.setTimeout(function(){
    //         $('.bannerStyle').css("background","url('campus-banner.jpeg')");
    //         $('.bannerStyle').css("background-repeat","no-repeat");
    //     },3000);
    //     window.setTimeout(function(){
    //         $('.bannerStyle').css("background","url('bhopalCampus.jpg')");
    //         $('.bannerStyle').css("background-repeat","no-repeat");
    //     },5000);
    //     window.setTimeout(function(){
    //         $('.bannerStyle').css("background","url('apcampus.jpeg')");
    //         $('.bannerStyle').css("background-repeat","no-repeat");
    //     },7000);
    // },10000);
