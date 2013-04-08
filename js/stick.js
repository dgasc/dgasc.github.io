!function ($) {

  var Sticky = function (element) {
    this.$element = $(element);
    this.top      = this.$element.offset().top;
    this.width    = this.$element.parent().width();
    this.listen();
  }

  Sticky.prototype = {

    constructor: Sticky

  , listen: function () {
      $(window).on('scroll', $.proxy(this.updatePosition, this));
      $(window).on('resize', $.proxy(this.updateSize, this));
    }

  , updateSize: function (event) {
      this.width = this.$element.parent().width();
      this.$element.css(
        this.top < $(event.currentTarget).scrollTop()
          ? {width: this.width}
          : {width: 'auto'}
      );
    }

  , updatePosition: function (event) {
      this.$element.css(
        this.top < $(event.currentTarget).scrollTop()+50
          ? {position: 'fixed', top: 50, width: this.width}
          : {position: 'static'}
      );
    }

  }

  var old = $.fn.sticky;
  $.fn.sticky = function () {
    return this.each(function () {
      new Sticky($(this));
   })
  }
  $.fn.sticky.Constructor = Sticky;
  $.fn.sticky.noConflict = function () {
    $.fn.sticky = old;
    return this;
  }

  $('.sticky').sticky();

}(window.jQuery);