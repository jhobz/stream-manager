var express = require('express');
var fs = require( 'fs' );
var router = express.Router();

/* GET progress bar page. */
router.get( '/progress_bar/subgoal', function ( req, res, next ) {
	res.render( 'partials/progress_bar', {
		title: 'Progress Bar',
		metric: 'subs'
	} );
} );

router.get( '/bits/boxes', function ( req, res, next ) {
	res.render( 'box_waterfall', { title: 'Bit Shooter' } );
} );

router.get( '/bits/starbits', function ( req, res, next ) {
	res.render( 'bit_shooter', { title: 'Bit Shooter' } );
} );

module.exports = router;
