'use strict';

var request = require( './../lib' );

var opts = {
	'hostname': 'api.travis-ci.org',
	'pathname': '/hooks',
	'data': {
		'hook': {
			'id': 42,
			'active': true // enable
		}
	},

	// INSERT TOKEN HERE //
	'token': '<your_token_goes_here>'
};

request( opts, onResponse );

/**
* FUNCTION: onResponse( error, data )
*	Callback invoked upon receiving a response.
*
* @private
* @param {Error|Null} error - error or null
* @param {Object[]} data - response data
* @returns {Void}
*/
function onResponse( error, data ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( data );
}
