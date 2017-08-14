var express = require('express');
var router = express.Router();

/* GET splash overlay. */
router.get( '/splash', function ( req, res, next ) {
	res.render(
		'overlays_splash',
		{
			title: 'Splash Screen',
			schedule: [
				{ day: 'S', game: 'Dark Souls' },
				{ day: 'M', game: 'Break Day', inactive: true },
				{ day: 'T', game: 'Dark Souls' },
				{ day: 'W', game: 'Ori DE' },
				{ day: 'T', game: 'Ori and the Blind Forest' },
				{ day: 'F', game: 'Over&shy;watch' },
				{ day: 'S', game: 'Kingdom Hearts' },
			]
		}
	);
} );

module.exports = router;
