/* ===================================================================
 * Dazzle - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		scrollDuration : 800, // smoothscroll duration
		mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'  // mailchimp url
	},	

	$WIN = $(window);	

   // Add the User Agent to the <html>
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

         // will fade out the whole preloader DIV that covers the website.
	      $("#preloader").delay(500).fadeOut('slow');
	  
	  	});
	};


	/* Mobile Menu
	 * ---------------------------------------------------- */ 
	var ssMobileMenu = function() {

  		var toggleButton = $('.header-menu-toggle'),
          nav = $('#header-nav-wrap');

		toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

		if (toggleButton.is(':visible')) nav.addClass('mobile');

		$(window).resize(function() {
			if (toggleButton.is(':visible')) nav.addClass('mobile');
			else nav.removeClass('mobile');
		});

		$('#header-nav-wrap').find('a').on("click", function() {  

			if (nav.hasClass('mobile')) {   		
				toggleButton.toggleClass('is-clicked'); 
				nav.slideToggle();   		
			}     
		});

	}; 


	/* FitVids
	 * ---------------------------------------------------- */
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 



  /* Owl Carousel
	* ------------------------------------------------------ */
	var ssOwlCarousel = function() {
			
		$(".owl-carousel").not(".eixos-carousel").owlCarousel({	
	      loop: true,
  			nav: false,
			autoHeight: true,
  			items: 1
	
		});

	};  	


  /* Eixos Carousel
	* ------------------------------------------------------ */
	var ssEixosCarousel = function() {

		var $carousel = $(".eixos-carousel");

		if (!$carousel.length) return;

		$carousel.owlCarousel({
			loop: false,
			nav: false,
			dots: true,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			smartSpeed: 450,
			margin: 72,
			responsive: {
				0: {
					items: 1,
					margin: 28
				},
				700: {
					items: 2,
					margin: 40
				},
				1024: {
					items: 3,
					margin: 72
				}
			}
		});

		var updateEixosNav = function(event) {
			var item = event.item || {};
			var visibleItems = event.page ? event.page.size : 1;
			var currentIndex = item.index || 0;
			var totalItems = item.count || 0;
			var isFirst = currentIndex <= 0;
			var isLast = currentIndex >= totalItems - visibleItems;

			$(".eixos-prev").prop("disabled", isFirst).toggleClass("is-disabled", isFirst);
			$(".eixos-next").prop("disabled", isLast).toggleClass("is-disabled", isLast);
		};

		$carousel.on("initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel", updateEixosNav);
		updateEixosNav({
			item: {
				index: 0,
				count: $carousel.find(".feature").length
			},
			page: {
				size: 3
			}
		});

		$(".eixos-prev").on("click", function() {
			$carousel.trigger("prev.owl.carousel");
		});

		$(".eixos-next").on("click", function() {
			$carousel.trigger("next.owl.carousel");
		});

		$(".eixos-nav-button").on("mouseenter focus", function() {
			$(".eixos-nav-button").removeClass("is-active");
			$(this).addClass("is-active");
		});

		$(".eixos-nav").on("mouseleave", function() {
			$(".eixos-nav-button").removeClass("is-active");
			$(".eixos-prev").addClass("is-active");
		});

		$(".eixos-prev").addClass("is-active");
	};


  /* Highlight the current section in the navigation bar
	* ------------------------------------------------------ */
	var ssWaypoints = function() {

		var sections = $("section"),
		navigation_links = $(".header-main-nav li a");	

		sections.waypoint( {

	       handler: function(direction) {

			   var active_section;

				active_section = $('section#' + this.element.id);

				if (direction === "up") active_section = active_section.prev();

				var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');			

	         navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");

			}, 

			offset: '25%'

		});
	};


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	  

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing', function () {
				window.location.hash = target;
			});

	  	});

	};



  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};



  	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	


  /* Animate On Scroll
  	* ------------------------------------------------------ */
	var ssAOS = function() {

		AOS.init( {
      	offset: 200,
      	duration: 600,
      	easing: 'ease-in-sine',
      	delay: 300,
			once: true,
			disable: 'mobile'
    	});

	};


  /* AjaxChimp
	* ------------------------------------------------------ */
	var ssAjaxChimp = function() {

		$('#mc-form').ajaxChimp({
			language: 'es',
		   url: cfg.mailChimpURL
		});

		// Mailchimp translation
		//
		//  Defaults:
		//	 'submit': 'Submitting...',
		//  0: 'We have sent you a confirmation email',
		//  1: 'Please enter a value',
		//  2: 'An email address must contain a single @',
		//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
		//  4: 'The username portion of the email address is invalid (the portion before the @: )',
		//  5: 'This email address looks fake or invalid. Please enter a real email address'

		$.ajaxChimp.translations.es = {
		  'submit': 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
		} 

	};


 
  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	

  
   /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssMobileMenu();
		ssFitVids();
		ssOwlCarousel();
		ssEixosCarousel();
		ssWaypoints();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAOS();
		ssBackToTop();

		// to use the mailchimp form, uncomment the 
		// function call ssAjaxChimp() below:
		// ssAjaxChimp(); 

	})();
 

})(jQuery);
