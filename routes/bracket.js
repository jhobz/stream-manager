var express = require('express');
var fs = require( 'fs' );
var router = express.Router();

router.get( '/', function ( req, res, next ) {
	var bracketJson = JSON.parse( fs.readFileSync( 'data/bracket.json', 'utf8' ) );
	res.render( 'bracket', bracketJson );
} );
router.get( '/division/:name', function ( req, res, next ) {
	var bracketJson = JSON.parse( fs.readFileSync( 'data/bracket.' + req.params.name + '.json', 'utf8' ) );
	bracketJson.partial = true;
	bracketJson.division = req.params.name;
	res.render( 'bracket', bracketJson );
} );

module.exports = router;
