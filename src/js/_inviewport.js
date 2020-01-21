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
