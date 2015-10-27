/**
 * H5Slider is designed for developer to implement in marketing fast
 * Author: Frankxin
 */

;var H5Slider = (function() {
  'use strict'

  var instance

  H5Slider = function(args) {
    if (instance) {
      return instance
    }

    instance = this

    this.opt = {
      sliderWay: 1, //by default
    }
    this.attrs = {
      /**
       * [$el] Every slider containers
       * @type {zepto object array}
       */
      $el : $('.item')
    }

    this._swipeUp = function(event){
      var $item = $(event.target).closest('.item'),
          _this = event.data._this

      if ($item.next().length) {
        //Effect
        $item.css('-webkit-transform', 'translate3d(0,-100%,0)')
        $item.next().css('-webkit-transform', 'translate3d(0,0,0)')

        _this.orderPart($item.next())
      }else{
        $item.css('-webkit-transform', 'scale(1)');
        $item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
      }
      
    }

    this._swipDown = function() {
      var $item = $(event.target).closest('.item')

      if ($item.prev().length) {
        //Effect
        $item.css('-webkit-transform', 'translate3d(0,100%,0)')
        $item.prev().css('-webkit-transform', 'translate3d(0,0,0)')
      }else{
        $item.css('-webkit-transform', 'scale(1)');
        $item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
      }

    }

    this._bindHandler = function(){
      console.log(this)
      this.attrs.$el.on('swipeUp', {_this: this} ,this._swipeUp)
      this.attrs.$el.on('swipeDown', {_this: this} , this._swipDown)
      $(document).on('touchmove',function(e){e.preventDefault();});
    }

    this._initDom = function(){

      //up and down arrow
      this.attrs.$el.slice(0,$('.item').length-1).append('<span class="arrow"></span>')
      
      //add a overlay to prevent multi-touch 
      //$('body').append('<div class="overlay"></div>');
      this.attrs.$el.find('.part').addClass('hide')
      //this.attrs.$el.trigger('orderPart',items.first())
      this.orderPart(this.attrs.$el.first());
    }

    this.orderPart = function(){
      var whichPage = arguments[0],
          parts = $(whichPage).find('.part')

      //traverse the parts and reveal item in order 
      //by data-delay
      parts.forEach(function(item){
        var time = $(item).attr('data-delay') || 100
        setTimeout(function(){
          $(item).removeClass('hide')
        },time)
      })

    }
    
    this.initialize = function(){
      this._bindHandler()
      this._initDom()
    }

    this.run = function(){
      this.initialize()
    }

    // your code goes here
  }

  return H5Slider
}());

var h5 = new H5Slider()
h5.run()