var express = require('express');
var fs = require( 'fs' );
var router = express.Router(),
	twitch = require( '../twitch.js' );

/* GET current follower data. */
router.get( '/followers/total', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	twitch.getChannelByName( 'jhobz296' ).then( function ( data ) {
		res.send( '' + data.followers );
	} );
} );

/* GET follower goal. */
router.get( '/followers/goal', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	res.send( '3500' );
} );

/* GET current subscriber data. */
router.get( '/subs/total', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	twitch.getSubPoints().then( points => res.send( '' + points ) );
} );

/* GET subscriber goal. */
router.get( '/subs/goal', function ( req, res, next ) {
	res.set( 'Content-Type', 'text/plain' );
	res.send( '100' );
} );

module.exports = router;
