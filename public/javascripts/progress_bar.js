var goal,
	isHorizontal,
	modifier = 0,
	metric = $( '#comp-progbar-data-metric' ).val(),
	queryParams = {};

// Parse the query string
location.search.substr( 1 ).split( "&" ).forEach( function (pair) {
	if ( pair === "" ) return;
	var parts = pair.split( "=" );
	queryParams[parts[0]] = parts[1] &&
		decodeURIComponent( parts[1].replace( /\+/g, " " ) );
});

goal = parseInt( queryParams.goal );
isHorizontal = queryParams.dir === 'horizontal';

function update() {
	$.get( '/data/twitch/' + metric + '/total', function ( t ) {
		updateUI( parseInt( t ), modifier, goal, isHorizontal );
	} );
}

function updateUI( total, modifier, goal, isHorizontal ) {
	if ( total >= goal ) {
		if ( isHorizontal ) {
			$( '.comp-progbar-inner' )
				.width( $( '.comp-progbar-outer' ).width() );
			$( '.comp-progbar-text' ).text( 'goal met!' );
		} else {
			var vert = generateVerticalText( 'goal met!' );
			$( '.comp-progbar-inner' )
				.height( $( '.comp-progbar-outer' ).height() );
			$( '.comp-progbar-text' ).html( vert );
		}
		$( '.comp-progbar-inner' ).addClass( 'met' );
	} else {
		var percentage = ( total - modifier ) / ( goal - modifier );
		if ( isHorizontal ) {
			$( '.comp-progbar-inner' )
				.width( percentage * $( '.comp-progbar-outer' ).width() );
			$( '.comp-progbar-text' ).text( total + ' / ' + goal );
		} else {
			var vert = generateVerticalText( total + ' -- ' + goal );
			$( '.comp-progbar-inner' )
				.height( percentage * $( '.comp-progbar-outer' ).height() );
			$( '.comp-progbar-text' ).html( vert );
		}
	}
}

function generateVerticalText( text ) {
	var result = '',
		words = text.split( ' ' );
	for ( var i = 0; i < words.length; i++ ) {
		result += '<div>' + words[i] + '</div>';
	}
	return result;
}

$( function () {
	$( '.comp-progbar-outer' ).addClass( isHorizontal ? 'horizontal' : 'vertical' );
	setInterval( update, 2000 );
} );
