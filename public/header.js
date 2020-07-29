//variables
let phone640p = window.matchMedia("(max-width: 640px)")
window.addEventListener("scroll", scrollNav);
//onclicks

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