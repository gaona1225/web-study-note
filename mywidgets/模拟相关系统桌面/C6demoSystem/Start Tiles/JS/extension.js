 /* Defined Config */	
	var userpic = 'Extras/user.png';
	var userloc = 'holiday,fl';	
	var uservid = 'BiViJkz10nw';
	var userxbox = 'Blind%20Bartemais';	
	var userdev = '216630151';

window.addEvent('domready', function(){

if (window.innerWidth && window.innerWidth <= 480) { 
var ww = '320px'; 
} else {
var ww = '950px';  
};
/* Slider Options*/
$('#two').ContentSlider({
width : ww,
height : '630px',
});

/* Sortable List */
new Sortables('#example2 UL', {
clone: false,
revert: false,
opacity: 0.7
});

 /* Load Youtube */
$$(' .youtube1').setProperty('data', 'http://www.youtube.com/v/' + uservid);
$$(' .youtube2').setProperty('value', 'http://www.youtube.com/v/' + uservid);

 /* Load Deviation */
$$(' .deviation').setProperty('src', 'http://backend.deviantart.com/embed/view.swf?id=' + userdev + '&width=150');

 /* Load Xbox */
$$(' .xboxtag').setProperty('href', 'http://live.xbox.com/en-US/MyXbox/Profile?Gamertag=' + userxbox);
$$(' .xboxpic').setProperty('src', 'http://avatar.xboxlive.com/avatar/' + userxbox + '/avatarpic-l.png');

 /* Load Weather & Map */
$$(' .weather').setProperty('src', 'http://weather.yahoo.com/badge/?q=' + userloc + '&u=f&t=trans&l=vertical');
$$(' .map').setProperty('src', 'http://maps.google.com/maps/api/staticmap?center=' + userloc + '&zoom=14&size=150x150&sensor=false');

function user_edit()
{
var tempuserpic=prompt("Image URL/Location","");
if (tempuserpic)
  {
  $$('.user').setProperty('src', tempuserpic);
  $.cookie('PUser', tempuserpic, { expires: 7 });
  };
}

$$('.user').addEvent('click', function(){
user_edit()
});

/* Tips 1 */
var Tips1 = new Tips($$('.tooltip'));

 /* Load Userpic */
// if cookie doesn't exist
if(!$.cookie('PUser')){
$$('.user').setProperty('src', userpic);}
else{
// if cookie exist
var newpic = $.cookie('PUser')
$$('.user').setProperty('src', newpic);};

 /* Load/Initialize Colors */
// if cookie doesn't exist
if(!$.cookie('PColor')){
$('.box').css("background-color", "#24a2ff");
$('.box2').css("background-color", "#24a2ff");}
else{
// if cookie exist
var newcolor = $.cookie('PColor')
$('.box').css("background-color", newcolor);
$('.box2').css("background-color", newcolor);};

 /* Color Picker With Auto Cookie Save */
$("div #color").click(function () {
  var color = $(this).css("background-color");
$('.box2').css("background-color", color);
$('.box').css("background-color", color);
$.cookie('PColor', color, { expires: 7 });
});
});

/* Slider */
(function($) {
if (window.innerWidth && window.innerWidth <= 480) { 
var ww = '220px'; 
} else {
var ww = '900px';  
};
  $.fn.ContentSlider = function(options)
  {
    var defaults = {
      leftBtn : './Extras/arrowleft.png',
      rightBtn : './Extras/arrowright.png',
      width : ww,
      height : '450px',
      speed : 400,
      easing : 'easeOutQuad',
      textResize : false
    } 
    var defaultWidth = defaults.width;
    var o = $.extend(defaults, options);
    var w = parseInt(o.width);
    var n = this.children('.cs_wrapper').children('.cs_slider').children('.cs_article').length;
    var x = -1*w*n+w; // Minimum left value
    var p = parseInt(o.width)/parseInt(defaultWidth);
    var thisInstance = this.attr('id');
    var inuse = false; // Prevents colliding animations

    function moveSlider(d, b)
    {
      var l = parseInt(b.siblings('.cs_wrapper').children('.cs_slider').css('left'));
      if(isNaN(l)) {
        var l = 0;
      }
      var m = (d=='left') ? l-w : l+w;
      if(m<=0&&m>=x) {
        b
          .siblings('.cs_wrapper')
            .children('.cs_slider')
              .animate({ 'left':m+'px' }, o.speed, o.easing, function() {
                inuse=false;
              });

        if(b.attr('class')=='cs_leftBtn') {
          var thisBtn = $('#'+thisInstance+' .cs_leftBtn');
          var otherBtn = $('#'+thisInstance+' .cs_rightBtn');
        } else {
          var thisBtn = $('#'+thisInstance+' .cs_rightBtn');
          var otherBtn = $('#'+thisInstance+' .cs_leftBtn');
        }
        if(m==0||m==x) {
          thisBtn.animate({ 'opacity':'0' }, o.speed, o.easing, function() { thisBtn.hide(); });
        }
        if(otherBtn.css('opacity')=='0') {
          otherBtn.show().animate({ 'opacity':'1' }, { duration:o.speed, easing:o.easing });
        }
      }
    }

    function vCenterBtns(b)
    {
      // Safari and IE don't seem to like the CSS used to vertically center
      // the buttons, so we'll force it with this function
      var mid = parseInt(o.height)/2;
      b
        .find('.cs_leftBtn img').css({ 'top':mid+'px', 'padding':0 }).end()
        .find('.cs_rightBtn img').css({ 'top':mid+'px', 'padding':0 });
    }

    return this.each(function() {
      $(this)
        // Set the width and height of the div to the defined size
        .css({
          width:o.width,
          height:o.height
        })
        // Add the buttons to move left and right
        .prepend('<a href="#" class="cs_leftBtn"><img src="'+o.leftBtn+'" /></a>')
        .append('<a href="#" class="cs_rightBtn"><img src="'+o.rightBtn+'" /></a>')
        // Dig down to the article div elements
        .find('.cs_article')
          // Set the width and height of the div to the defined
          .css({
            width:o.width,
            height:o.height
          })
          .end()
        // Animate the entrance of the buttons
        .find('.cs_leftBtn')
          .css('opacity','0')
          .hide()
          .end()
        .find('.cs_rightBtn')
          .hide()
          .animate({ 'width':'show' });

      // Store a copy of the button in a variable to pass to moveSlider()
      var leftBtn = $(this).children('.cs_leftBtn');
      leftBtn.bind('click', function() {
        if(inuse===false) {
          inuse = true;
          moveSlider('right', leftBtn);
        }
        return false; // Keep the link from firing
      });

      // Store a copy of the button in a variable to pass to moveSlider()
      var rightBtn = $(this).children('.cs_rightBtn');
      rightBtn.bind('click', function() {
        if(inuse===false) {
          inuse=true;
          moveSlider('left', rightBtn);
        }
        return false; // Keep the link from firing
      });

      vCenterBtns($(this)); // This is a CSS fix function.
    });
  }
})(jQuery)
