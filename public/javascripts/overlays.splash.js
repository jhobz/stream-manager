$( function () {
	var progressTimer,
		startTime = Date.now(),
		endTime = startTime + ( 5 * 60 * 1000 );

	var $progressBar = $( '.overlay-progress-bar-outer' );
	progressTimer = setInterval( function () {
		updateProgressBar( $progressBar );
	}, 17 )

	var day = ( new Date() ).getDay() + 1;
	$( '.overlay-schedule-day:nth-child(' + day + ')' ).addClass( 'active' );

	function updateProgressBar( $elem ) {
		var currentTime = Date.now(),
			percentage = ( currentTime - startTime ) / ( endTime - startTime ),
			fullWidth = $elem.width() + 54,
			$inner = $elem.children( '.overlay-progress-bar-inner' ),
			$text = $elem.children( '.overlay-progress-bar-text' );

		if ( percentage >= 1 ) {
			$inner.removeClass( 'animating' );
			clearInterval( progressTimer );
			$text.text( '' );
			$( '.overlay-header' ).text( 'Starting soon' );
		} else {
			$inner.width( percentage * fullWidth );
			var diffDate = new Date( endTime - currentTime ),
				mins = diffDate.getMinutes(),
				secs = ( diffDate.getSeconds() < 10 ? '0' : '' ) + diffDate.getSeconds();
			$text.text( mins + ':' + secs );
		}
	}
} );
