$(function(){
   var cur = 0;
   var BannerPicCount=$('.banner_word ul li').length;
      var timer = setInterval(autoRun,3000);//设立定时器
      function autoRun(){//自动轮播函数
        cur++;
        cur = (cur==BannerPicCount)?0:cur;
        var top = -193*cur;
        $('.banner_pic ul').stop().animate({'top':top+'px'},300);
        $('.banner_word ul li a').eq(cur).addClass('hover').parent().siblings().find('a').removeClass('hover');
      }
      $('.banner_word ul li a').mouseover(function(){
        clearInterval(timer);//清除定时器
        cur = $(this).parent().index();
        var top = -193*cur;
        $('.banner_pic ul').stop().animate({'top':top+'px'},300);
        $(this).addClass('hover').parent().siblings().find('a').removeClass('hover');
      })

      $('.banner_word ul li a').mouseout(function(){
      timer = setInterval(autoRun,3000);//设立定时器
    })
})