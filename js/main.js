(function($) {
	var $window = $(window),
	$body = $('body'),
	$menu = $('#menu'),
	$sidebar = $('#sidebar'),
	$main = $('#main');
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});
	$window.on('load',
	function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		},
		100);
	});
	
	
	
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
		
		/**
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})**/
			
			$body
			.on('click', '#wrapper', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			
			
			
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});
	
	
	
	var $search = $('#search'),
	$search_input = $search.find('input');
	$body.on('click', '[href="#search"]',
	function(event) {
		event.preventDefault();
		if (!$search.hasClass('visible')) {
			$search[0].reset();
			$search.addClass('visible');
			$search_input.focus();
		}
	});
	
	
	$search_input.on('keydown',
	function(event) {
		if (event.keyCode == 27) $search_input.blur();
	}).on('blur',
	function() {
		window.setTimeout(function() {
			$search.removeClass('visible');
		},
		100);
	});
	
	
	var $intro = $('#intro');
	breakpoints.on('<=large',
	function() {
		$intro.prependTo($main);
	});
	breakpoints.on('>large',
	function() {
		$intro.prependTo($sidebar);
	});
})(jQuery);