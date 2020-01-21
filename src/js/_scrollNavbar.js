var navbarCollapse = function() {
    if ($(".header").offset().top > (window.innerHeight - 65)) {
      $(".header").addClass("scrolled");
    } 
    else {
      $(".header").removeClass("scrolled");
    }
  };
  var lastScrollTop = 0;

  
window.addEventListener("scroll", function(){
$(document).scroll(navbarCollapse); 
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      // downscroll code
      if( $(".scrolled")){
        $(".scrolled").addClass("hideNav");             
      }      
      else{
        $(".scrolled").removeClass("hideNav");
      }
   } else {
      // upscroll code
      if( $(".scrolled")){
        $(".scrolled").removeClass("hideNav");
      }
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);