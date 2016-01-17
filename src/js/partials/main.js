$(function() {
  'use strict';

  var scrollTopFunction = null,
      _ua = (function(u){
        return {
          isTablet:(u.indexOf('windows') !== -1 && u.indexOf('touch') !== -1 && u.indexOf('tablet pc') === -1) ||
            u.indexOf('ipad') !== -1 ||
            (u.indexOf('android') !== -1 && u.indexOf('mobile') === -1) ||
            (u.indexOf('firefox') !== -1 && u.indexOf('tablet') !== -1) ||
            u.indexOf('kindle') !== -1 ||
            u.indexOf('silk') !== -1 ||
            u.indexOf('playbook') !== -1,

          isMobile:(u.indexOf('windows') !== -1 && u.indexOf('phone') !== -1) ||
            u.indexOf('iphone') !== -1 ||
            u.indexOf('ipod') !== -1 ||
            (u.indexOf('android') !== -1 && u.indexOf('mobile') !== -1) || 
            (u.indexOf('firefox') !== -1 && u.indexOf('mobile') !== -1) ||
            u.indexOf('blackberry') !== -1
        };
      })(window.navigator.userAgent.toLowerCase());
  
  if (_ua.isMobile) {
    scrollTopFunction = function() {};
  } else {
    if (window.matchMedia && window.matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
      scrollTopFunction = function() {
        var positionTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
        $('.navbar-sticky').stop().animate(positionTop > 40 ? {top: '0'} : {top: '-80'});
      };
    } else if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
      scrollTopFunction = function() {
        var positionTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
        $('.navbar-sticky').stop().animate(positionTop > 40 ? {top: '0'} : {top: '-120'});
      };
    }
  }

  $(document).ready(function() {
    scrollTopFunction();
    $(window).scroll(scrollTopFunction);

    $('#header').waitForImages(function() {
      $('body').addClass('site-loaded'); 
    });

    if (window.matchMedia) {
      if (window.matchMedia('(min-width: 640px)').matches && (!_ua.isTable && !_ua.isMobile)) {
        var videoElem = $('<div id="video-container"></div>').prependTo($('body')),
            videoBackground = new $.backgroundVideo(videoElem, {
              align: 'centerXY',
              width: 1280,
              height: 720,
              path: 'http://mazwai.com/system/posts/videos/000/000/138/original/',
              filename: 'matt_devir--one_minute_drive',
              types: ['mp4']
            });

        videoBackground.$videoEl.on('loadeddata', function() {
          $('#header').removeClass('novideo');
        });
      } else {
        $('#header').removeClass('novideo');
      }
    }

    $(function() {
      $(".main-navbar").onePageNav({
        scrollThreshoId: 0.25,
        filter: ':not(.external)',
        changeHash: true,
        scrollSpeed: 750
      });
    });

    $(function() {
      var self = $('#navbar-main'),
          revisionCheckbox = $('.navbar-toggle');

      self.on('click', 'a', null, function() {
        if (revisionCheckbox.is(':visible')) {
          self.collapse('hide');
        }
      });
    });

    $(function() {
      $('#news .table > tbody').empty();
      $.getJSON('assets/jsons/news.json', function(data) {
        $(data.news).each(function(index, item) {
          var rowTag = '<tr>' +
            '<td>&nbsp;</td>' +
            '<td>' + item.publishDate + '</td>' +
            '<td>&nbsp;</td>' +
            '<td>' + item.content + '</td>' +
            '<td>&nbsp;</td>' +
            '</tr>';

          $(rowTag).appendTo('#news .table > tbody'); 
        }) ;
      });
    });
  });
});