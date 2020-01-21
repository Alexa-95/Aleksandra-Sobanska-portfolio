'use strict';

$.extend($.easing, {
  easeOutExpo: function (x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});
(function () {

    if (!document.getElementsByClassName('__js_section').length) return;
  
    var customOffset = 100,
      animationTime = 800,
  
      //-------------------------------------------------------
  
      initSlug = document.location.pathname.split("/").pop(),
  
      activeSlug = initSlug,
  
      $sections = $('.__js_section'),
  
    //   /* Przewijanie do sekcji slug jeżeli w URL jest ustawiony jakiś slug */
    //   scrollOnStart = function () {
  
    //     $('html,body').animate({
    //       scrollTop: $('#' + initSlug).offset().top - customOffset
    //     }, animationTime, 'easeOutExpo');
  
    //     var art_title = $(String(initSlug)).parent().data('id');

  
    //     changeActiveSlug(initSlug);
  
    //   },
  
      changeActiveSlug = function (slug) {
  
        activeSlug = slug;
  
        $('.header--nav [data-slug]').removeClass("__active");
        $('.header--nav [data-slug=' + activeSlug + ']').addClass("__active");
  
  
        $('.header--nav ul').attr('class', 'order_' + getActiveSlugIndex());
        history.pushState({
          id: slug
        }, $(this).attr('title'), slug);
  
      },
  
      /* Sprawdza index sluga, domyślnie aktualnego */
      getActiveSlugIndex = function (slug) {
        if (!slug) slug = activeSlug;
        return $('.header--nav [data-slug=' + slug + ']').parent().parent().index();
      },
  
      /* Sprawdzanie czy user zescrollował do sekcji. Jeżeli tak to ustawia pozycję w nawigacji */
      sectionScrollCheck = function () {
  
        sectionScrollCheckTS = setTimeout(sectionScrollCheck, 200);
  
        var $W = $(window),
          topScroll = $W.scrollTop(),
          wHeight = $W.height();
  
        //wymuszenie strony głównej
        if (topScroll <= customOffset) {
          changeActiveSlug($sections.eq(0).attr('id'));
          return;
        }
  
        for (var i = 0; i < $sections.length; i++) {
          var $section = $sections.eq(i),
            sectionOffset = $section.offset().top,
            sectionHeight = $section.height();
  
          //console.info(i, topScroll, sectionOffset, sectionOffset + sectionHeight)
  
          if (activeSlug != $section.attr('id') &&
            topScroll > sectionOffset - customOffset - 10 &&
            topScroll < sectionOffset + sectionHeight - customOffset - 10) {
  
            changeActiveSlug($section.attr('id'));
            break;
          }
  
        }
      },
      sectionScrollCheckTS = null,
  
  
  
      /* Inicjalizacja metod dla obsługi nawigacji - clików i sprawdzanie scrolla */
      initNavigation = function () {
  
        sectionScrollCheckTS = setTimeout(sectionScrollCheck, animationTime + 25);
  
        $('.header--nav [data-slug]').on('click', function (e) {
  
          if (sectionScrollCheckTS) clearTimeout(sectionScrollCheckTS);
  
          e.preventDefault();
          var $this = $(this),
            slug = $(this).data('slug');
          if (!slug.length) slug = "/";
  
  
          changeActiveSlug(slug);
  
          $('html,body').animate({
            scrollTop: getActiveSlugIndex() > 0 ? $('#' + slug).offset().top - customOffset : 0
          }, animationTime, 'easeInOutExpo');
          sectionScrollCheckTS = setTimeout(sectionScrollCheck, animationTime + 25);
        });
      };
  
    // if (initSlug.length > 1) {
    //   setTimeout(scrollOnStart, 600);
    // }
    initNavigation();
  
  })();


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
$.fn.isOnScreen = function() {
  var $W = $(window);

  var viewport = {
    top: $W.scrollTop(),
    left: $W.scrollLeft()
  };

  viewport.right = viewport.left + $W.width();
  viewport.bottom = viewport.top + $W.height();

  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return !(
    viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom
  );
};

var checkInVP = function() {
  $("._js_inViewport").each(function() {
    if ($(this).isOnScreen()) {
      $(this).addClass("__js_onScreen");
    } else {
      $(this).removeClass("__js_onScreen");
    }
  });

  $(".square_inner").each(function() {
    if ($(this).isOnScreen()) {
      $(this).addClass("square_inViewport");
    } else {
      $(this).removeClass("square_inViewport");
    }
  });

  setTimeout(checkInVP, 690);
};
setTimeout(checkInVP, 690);

"use strict";

(function() {
  var MenuToggler = $(".header--hamburger").click(function(e) {
    $(this).toggleClass("__js_isActive");
    $(this)
      .parent()
      .find("nav")
      .toggleClass("__js_isActive");
  });
  $(".header ul").on("click", function() {
    $(this)
      .parents(".header--nav")
      .removeClass("__js_isActive");
      $(".header--hamburger").removeClass("__js_isActive");
  });
  $(".header").on("mouseleave", function() {
    $(this)
      .find(".header--nav")
      .removeClass("__js_isActive");
      $(".header--hamburger").removeClass("__js_isActive");
  });
})();


$(function() {
    var owl = $('.owl-carousel'),

        owlOptions = {
          loop: true,
			    margin: 30,
			    smartSpeed: 700,
                nav: true,
                autoplay:true,
                draggable: true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
			    items: 1
        };

    if ( $(window).width() < 768 ) {
        var owlActive = owl.owlCarousel(owlOptions);
    } else {
        owl.addClass('off');
    }

    $(window).resize(function() {
        if ( $(window).width() < 768 ) {
            if ( $('.owl-carousel').hasClass('off') ) {
                var owlActive = owl.owlCarousel(owlOptions);
                owl.removeClass('off');
            }
        } else {
            if ( !$('.owl-carousel').hasClass('off') ) {
                owl.addClass('off').trigger('destroy.owl.carousel');
                owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
            }
        }
    });
});
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