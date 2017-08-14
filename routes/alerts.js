var express = require('express'),
	fs = require( 'fs' ),
	router = express.Router();

router.get( '/bits', function ( req, res, next ) {
	res.render( 'alerts.bits', { title: 'bits' } );
} );

module.exports = router;
