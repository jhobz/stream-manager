$( function () {
	//renderBracketPair( 'JHobz', 'somescrub' );
	//renderBracketPair( 'Terra', 'Roose' );

	$( '.bracket-entrant' ).click( function () {
		var winner = this.id;
		animateWinner( this.id );
	} );

	// function renderBracketPair( higherSeed, lowerSeed ) {
	// 	$.get( 'bracket/bracket.hogan', {
	// 		higherSeed: higherSeed,
	// 		lowerSeed: lowerSeed
	// 	}, function ( data ) {
	// 		$( data + '<br>' ).appendTo( '#bracketContainer' );
	// 	} );
	// }

	function animateWinner( id ) {
		var height = $( '#' + id ).height();
		$( '#' + id )
			.animate( {
				width: 250,
				height: 75,
				fontSize: '2em',
				lineHeight: '75px',
				backgroundColor: '#cccd15'
			}, 500, 'easeInOutBack' )
			.delay( 1000 )
			.animate( {
				width: 200,
				height: height,
				fontSize: '1em',
				lineHeight: '1em'
			}, 500, function () {
				$( this ).addClass( 'winner' );
			} );
	}
} );
