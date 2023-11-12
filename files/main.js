// High Contrast ===================================================================================
(function(){
  'use strict';
  
  var high_contrast_action = document.getElementById('high-contrast-action');
  var high_contrart_rules  = '\
    * { background-color: #222 !important; color: #fff !important; } \
    a { color: #00FF00 !important; } \
    a:hover { color: #fff !important; } \
    footer .links-wrapper { background: none !important; } \
    .bottom-wrapper { border-top: 1px solid #fff !important; } \
    .easingslider-arrows, .easingslider-icon, .easingslider-pagination{ background-color: transparent !important; } \
    #page-canvas.active #page-content .overlay { background: rgba(0,0,0,0.2) !important; } \
    .modal-dialog * { background-color: #222 !important; border-color: #222 !important;} \
    .modal-dialog .modal-dialog-header * { background-color: #222 !important; } \
    .modal-dialog .modal-dialog-header {  border-bottom: 1px solid white !important; } \
    .modal-overlay { background: rgba(0,0,0,0.8) !important; } \
    .label { border: 1px solid white !important; } \
    .pagination .active a { border-color: white !important; } \
  ';
  
  function loadPreferredState() {
    var state = Cookies.get('contrast-state');
    if(typeof state === 'undefined' || state === ''){
      Cookies.set('contrast-state', 0);
      state = 0;
    }
    toggleContrast(state);
  }
  
  function toggleContrast(state) {    
    if (state == 1) {
      if (!document.getElementById('high-contrast-style')) {
        var body          = document.getElementsByTagName('body')[0];
        var style_div     = document.createElement('style');
        var style_content = document.createTextNode(high_contrart_rules);
        
        style_div.id = 'high-contrast-style';
        style_div.appendChild(style_content);
        document.head.appendChild(style_div);
        Cookies.set('contrast-state', 1);
      }
    } else {
      if (document.getElementById('high-contrast-style')) {
        var style_div = document.getElementById('high-contrast-style');
        document.head.removeChild(style_div);
        Cookies.set('contrast-state', 0);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadPreferredState();
    
    high_contrast_action.addEventListener('click', function() {
      if (parseInt(Cookies.get('contrast-state')) == 0) {
        toggleContrast(1);
      } else {
        toggleContrast(0);
      }
    });
  });
})();

// Font Size =======================================================================================
(function(){
  'use strict';
  
  var add_action   = document.getElementById('add-font-size');
  var reset_action = document.getElementById('reset-font-size');
  var minus_action = document.getElementById('minus-font-size');
  var factor       = 1.08;
  var elements     = document.querySelectorAll('a, p, h1, h2, h3, h4, h5, h6, address');
  
  function addSize(state) {
    if (state < 5) {
      state = parseInt(state) + 1;
      Cookies.set('font-size-state', state);
          
      Array.prototype.forEach.call(elements, function(el, i) {
        var actual_size = getComputedStyle(el).fontSize.slice(0, -2);
        el.style.fontSize = actual_size * factor + 'px';
      });
    }
  }
  
  function minusSize(state) {
    if (state > -3) {
      state = parseInt(state) - 1;
      Cookies.set('font-size-state', state);
          
      Array.prototype.forEach.call(elements, function(el, i) {
        var actual_size = getComputedStyle(el).fontSize.slice(0, -2);
        el.style.fontSize = actual_size / factor + 'px';
      });
    }
  }
  
  function resetFontSize() {
    var state = parseInt(Cookies.get('font-size-state'));
    
    if (state > 0) {
      for (var i = state; i > 0; i--) {
        minusSize(i);
      }
    } else {
      for (var i = state; i < 0; i++) {
        addSize(i);
      }
    }
  }
  
  function loadPreferredSize() {
    var state = Cookies.get('font-size-state');
    if(typeof state === 'undefined' || state === ''){
      Cookies.set('font-size-state', 0);
      state = 0;
    } else {
      state = parseInt(state);
    }
    
    if (state > 0) {
      for (var i = 0; i < state; i++) {
        addSize(i);
      }
    } else {
      for (var i = 0; i > state; i--) {
        minusSize(i);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadPreferredSize();
    
    add_action.addEventListener('click', function() {
      addSize(parseInt(Cookies.get('font-size-state')));
    });
    
    reset_action.addEventListener('click', function() {
      resetFontSize();
    });
    
    minus_action.addEventListener('click', function() {
      minusSize(parseInt(Cookies.get('font-size-state'))); 
    });
  });
  
})();

// Off Canvas Menu =================================================================================
(function(){
  'use strict';
  
  function toggleOffCanvas() {
    if ($('#page-canvas').hasClass('active')) {
      // Do things on Nav Close
      $('#page-canvas').removeClass('active');
      $('.overlay').remove();
    } else {
      // Do things on Nav Open
      $('#page-canvas').addClass('active');
      $('#page-content').append('<div class="overlay"></div>');
    }
  }
  
  $(function() {
    $('#toggle-off-canvas').click(function(e) {
      e.preventDefault();
      toggleOffCanvas();
    });
    
    $('#page-content').on('click', '.overlay', function(e) {
      e.preventDefault();
      toggleOffCanvas();
    });
    
    $('#page-canvas').on('swipe', '.overlay', function(e) {
      e.preventDefault();
      toggleOffCanvas();
    });
    
    $(window).on('scroll', function(e) {
      if ($(window).scrollTop() > 300) {
        $('.nav-mobile').addClass("fix-top");
      } else {
        $('.nav-mobile').removeClass("fix-top");
      }
    });
  });
})();

// Dropdown Menu ===================================================================================
(function(){
  'use strict';
  
  $(function() {
    $('.main-menu li').hover(
      function() {
        var position = $(this).position();
        
        $(this).addClass('active');
        $(this).children('.main-nav-bg').show();
        $(this).children('.sub-menu').show();
      },
      function() {
        $(this).removeClass('active');
        $(this).children('.main-nav-bg').hide();
        $(this).children('.sub-menu').hide();
      }
    );
  });
})();

// Magnific Popup ==================================================================================
(function(){
  'use strict';
  
  $(function() {
    $('.entry-content a[href*=".jpg"], .entry-content a[href*=".jpeg"], .entry-content a[href*=".png"], .entry-content a[href*=".gif"]').each(function(){
      if ($(this).parents('.gallery').length == 0) {
        $(this).magnificPopup({
            type:'image',
            closeOnContentClick: true,
        });
      }
    });
    
    $('.gallery').each(function() {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {enabled: true}
      });
    });
  });
})();

// Modal ===========================================================================================
(function(){
  'use strict';
    
  $(function() {
    $('.modal-activate').click(function(e) {
      e.preventDefault();
      
      $(this).next('.modal-dialog').addClass('active');
      $('.modal-overlay').addClass('active');
    });
    
    $('.modal-overlay').click(function() {
      $('.modal-dialog').removeClass('active');
      $('.modal-overlay').removeClass('active');
    });
    
    $('.modal-dialog-close').click(function(e) {
      e.preventDefault();
      $('.modal-dialog').removeClass('active');
      $('.modal-overlay').removeClass('active');
    });
  });
})();

// Main Menu ========================================================================================
(function(){
  'use strict';
  
  $(function() {
    $('#accordion-off-canvas').on('click', '.collapsible', function(e) {
      $(this).find('i').toggleClass('fa-rotate-90');
    });
    
    $('#accordion-side-menu').on('click', '.collapsible', function(e) {
      $(this).find('i').toggleClass('fa-rotate-90');
    });
  });
})();

// EOF =============================================================================================