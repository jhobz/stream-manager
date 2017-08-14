/* Boilerplate */
var express = require( 'express' ),
	path = require( 'path' ),
	favicon = require( 'serve-favicon' ),
	logger = require( 'morgan' ),
	cookieParser = require( 'cookie-parser' ),
	bodyParser = require( 'body-parser' ),
/* Routes */
	index = require( './routes/index' ),
	alerts = require( './routes/alerts' ),
	bracket = require( './routes/bracket' ),
	twitchData = require( './routes/twitch' ),
	progress = require( './routes/components' ),
	overlays = require( './routes/overlays' ),
	users = require( './routes/users' ),
/* Other */
	twitch = require( './twitch.js' ),
	hbs = require( 'hbs' ),
	app = express();

// view engine setup
hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( require( 'node-sass-middleware' )( {
  src: path.join( __dirname, 'public' ),
  dest: path.join( __dirname, 'public' ),
  indentedSyntax: true,
  sourceMap: true
} ) );
app.use( express.static( path.join( __dirname, 'public') ) );

app.use( '/', index );
app.use( '/alerts', alerts );
app.use( '/bracket', bracket );
app.use( '/components', progress );
app.use( '/data/twitch', twitchData );
app.use( '/overlays', overlays );
app.use( '/users', users );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );

// error handler
app.use( function( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );

module.exports = app;
