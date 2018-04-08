var express = require('express');
var router = express.Router();

/* GET splash overlay. */
router.get( '/splash', function ( req, res, next ) {
	res.render(
		'overlays_splash',
		{
			title: 'Splash Screen',
			schedule: [
				{ day: 'S', game: '' },
				{ day: 'M', game: '' },
				{ day: 'T', game: 'Crash NST and Rayman' },
				{ day: 'W', game: 'I might get rid of' },
				{ day: 'T', game: 'this schedule since' },
				{ day: 'F', game: 'I don\'t stick to it' },
				{ day: 'S', game: 'very often' },
			]
		}
	);
} );

module.exports = router;
