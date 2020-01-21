

window.addEventListener('scroll', function(e) {
    var homeBg = document.querySelector(".home-bg");
    var homeSun = document.querySelector(".home-sun");
    var scroll = this.scrollY;
    var windowHeigh = this.innerHeight;

    var yellow = 223;

    var oragne = 188;

        homeBg.style.transform = "translateY("+ -1*scroll +"px)";
        homeSun.style.cssText  = "transform: translate("+ 0.5*scroll +"px," + 0.5*scroll +"px); background: radial-gradient(circle, rgba(255,"+ (yellow - (scroll/5)) +",38,1) 0%, rgba(255,"+ (oragne - (scroll/5)) +",25,1) 60%, rgba(255,255,255,0) 100%); box-shadow: 0px 0px 20px 5px rgba(255,"+ (oragne - (scroll/5)) +",25,1);";
});