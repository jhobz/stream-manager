var express = require('express');
var fs = require( 'fs' );
var router = express.Router(),
	twitch = require( '../twitch.js' );

/* GET current follower data. */
router.get( '/total', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	twitch.getChannelByName( 'jhobz296' ).then( function ( data ) {
		res.send( '' + data.followers );
	} );
} );

/* GET follower goal. */
router.get( '/goal', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	res.send( '2250' );
} );

module.exports = router;
