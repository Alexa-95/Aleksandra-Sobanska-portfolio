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
