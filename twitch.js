var keys = require( './data/keys.js' ),
	accessToken = keys.accessToken,
	CLIENT_ID = keys.CLIENT_ID,
	CLIENT_SECRET = keys.CLIENT_SECRET,
	CHANNEL_ID = keys.CHANNEL_ID,
	CHANNEL_CODE = keys.CHANNEL_CODE,
	urlPrefix = 'https://api.twitch.tv/kraken/',
	request = require( 'request-promise-native' ),
	kraken = request.defaults( {
		baseUrl: urlPrefix,
	 	headers: {
			'Accept': 'application/vnd.twitchtv.v5+json',
			'Client-ID': CLIENT_ID
		},
		json: true
	} ),
	twitch = {};

twitch._authenticate = function ( scope, force = false ) {
	if ( !force &&
		accessToken.token &&
		accessToken.scope &&
	 	accessToken.token.length &&
		!scope.some( val => accessToken.scope.indexOf( val ) === -1 ) ) {
		// TODO: Clean up this shitpile.
		return { then: function ( f ) { return f( accessToken.token ); } };
	}

	return kraken.post( {
		uri: '/oauth2/token',
		body: {
			'client_id': CLIENT_ID,
			'client_secret': CLIENT_SECRET,
			'code': CHANNEL_CODE,
			'grant_type': 'authorization_code',
			'redirect_uri': 'http://localhost'
		},
		transform: function ( body ) {
			return body.access_token;
		}
	} );
};

twitch._getSubscribers = function ( accessToken ) {
	return kraken.get( {
		uri: '/channels/' + CHANNEL_ID + '/subscriptions',
		headers: {
			'Authorization': 'OAuth ' + accessToken
		}
	} );
};

twitch._getIdForUser = function ( username ) {
	// TODO: Cache userIds
	return kraken.get( {
		uri: '/users',
		qs: {
			login: username
		}
	} ).then( ({ _total, users }) => {
		if ( _total === 0 ) {
			return null;
		}
		return users[0]._id;
	} );
};

twitch._checkChannelSubscription = function ( accessToken, username ) {
	let userId = this._getIdForUser( username );
	return userId.then( id => {
		return kraken.get( {
		uri: '/channels/' + CHANNEL_ID + '/subscriptions/' + id,
		headers: {
			'Authorization': 'OAuth ' + accessToken
		}
	} ) } );
};

twitch._getFollowerList = function ( accessToken ) {
	return kraken.get( {
		uri: '/channels/' + CHANNEL_ID + '/follows',
		headers: {
			'Authorization': 'OAuth ' + accessToken
		}
	} );
};

twitch._getSubscriberCount = function ( accessToken ) {
	return kraken.get( {
		baseUrl: null,
		url: 'https://api.twitch.tv/api/channels/jhobz296/subscriber_count',
		headers: {
			'Authorization': 'OAuth ' + accessToken
		}
	} );
};

twitch.getSubscribers = function () {
	return this._authenticate( ['channel_subscriptions'] ).then( token =>
		this._getSubscribers( token ).then( ( {subscriptions} ) => {
			let subs = [];
			for ( let sub of subscriptions ) {
				// TODO: Evaluate if jhobz296 should be removed here
				subs.push( sub.user.display_name );
			}
			return subs;
		} )
	);
};

twitch.getSubPoints = function () {
	return this._authenticate( ['channel_subscriptions'] ).then( token =>
		this._getSubscriberCount( token ).then( ( {score} ) => score )
	);
};

twitch.getSubscribers().then( out => console.log( out ) );

// twitch._authenticate( ['channel_check_subscription'] ).then( token => {
// 	twitch._getSubscribers( token ).then( out => console.log(out));
// 	twitch._checkChannelSubscription( token, 'elehex' ).then( out => console.log(out))
// 	}
// );

module.exports = twitch;
