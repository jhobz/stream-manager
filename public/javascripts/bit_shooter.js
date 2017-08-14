$( function () {
	$( '#click' ).click( handleTip );

	function handleTip ( data ) {
		data.response = {
			name: 'Person who donated',
			amount: 1000
		}
		var $luma = $( '.comp-bs-target' );

		for ( var i = 0; i < data.response.amount; i++ ) {
			var starbit = Handlebars.templates.starbit( /* { additionalClasses: 'comp-bs-starbit' } */ );
			var $starbit = $( starbit );
			var $elem = $( '<div class="comp-bs-bit comp-bs-starbit" />' )
				.on( 'animationend', function () {
					$luma.toggleClass( 'big' );
					$( this ).remove();
				} )
				// .css( 'animation-delay', ( 0.05 * i ) + 's' )
				.append( $starbit )
				.appendTo( '.comp-bs-container' )
				.hide();
			// Showing the element starts the animation. We could use
			// `animation-delay`, but then all of our bits would be loaded
			// at the same time, which slows down the browser at even relatively
			// small amounts (~100) due to the complexity of the small
			// stellated dodecahedrons. Adding all of the elements hidden
			// and then delaying drawing is adequately performant.
			setTimeout( function ($elem) {
				$elem.show();
			}, 50 * i, $elem);
		}
	}
} );
