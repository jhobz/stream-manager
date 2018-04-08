$( function () {
	$( '#click' ).click( handleTip );

	function handleTip ( data ) {
		// data.response = {
		// 	name: 'Person who donated',
		// 	amount: 1000
		// }
		// var $target = $( '.comp-bs-target' );
		//
		// for ( var i = 0; i < data.response.amount; i++ ) {
		// 	var $projectile = $( '<div class="comp-bs-bit comp-bs-box" />' )
		// 		.on( 'animationend', function () {
		// 			$target.toggleClass( 'hit' );
		// 			$( this ).remove();
		// 		} )
		// 		// .css( 'animation-delay', ( 0.05 * i ) + 's' )
		// 		// .append( $projectile )
		// 		.appendTo( '.comp-bs-container' )
		// 		.hide();
		// 	// Showing the element starts the animation. We could use
		// 	// `animation-delay`, but then all of our bits would be loaded
		// 	// at the same time, which slows down the browser at even relatively
		// 	// small amounts (~100) due to the complexity of the small
		// 	// stellated dodecahedrons. Adding all of the elements hidden
		// 	// and then delaying drawing is adequately performant.
		// 	setTimeout( function ( $elem ) {
		// 		$elem.show();
		// 	}, 166.7 * i, $projectile );
		// }
	}

	var $imgInit = $( '#init' ),
		$imgLoop = $( '#loop' ),
		$imgEnd = $( '#end' ),
		$button = $( '.comp-bs-container' ),
		bits = 40;

	$imgInit.hide();
	$imgLoop.hide();
	$imgEnd.hide();

	$button.on( 'click', function () {
		startGif( $imgInit );
		$( 'img' ).css( {
			width: 'initial',
			height: 'initial'
		} );

		// queue up loop to start at end of init
		setTimeout( function () {
			if ( bits > 32 ) {
				$imgInit.hide();
				startGif( $imgLoop );
				// 8 bits per loop
				var loops = Math.round( ( bits - 32 ) / 8 );
				// Hard cap because otherwise it'll play for 30 min
				if ( loops > 42 ) {
					loops = 42;
				}

				// queue up end after 4 loops
				setTimeout( function () {
					$imgLoop.fadeOut( 100 );
					startGif( $imgEnd );

					// hide end after it's done
					setTimeout( function () {
						$imgEnd.fadeOut( 1000 );
					}, 328 / 60 * 1000 );
				}, 80 * loops / 60 * 1000 );
			} else {
				$imgInit.fadeOut( 500 );
				startGif( $imgEnd );

				setTimeout( function () {
					$imgEnd.fadeOut( 1000 );
				}, 328 / 60 * 1000 );
			}

			// 97 frames before first box
			// 32 boxes in remaining 373 frames = 11.656 fpb
		}, ( 97 + ( 11.656 * ( bits > 32 ? 32 : bits ) ) ) / 60 * 1000 );
	} );

	function startGif( $el ) {
		$el.show();
		$el.attr( 'src', $el.attr( 'src' ) );
	}

} );
