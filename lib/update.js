'use strict';

// MODULES //

var factory = require( './factory.js' );


// UPDATE //

/**
* FUNCTION: update( data, opts, clbk )
*	Updates a Travis CI resource.
*
* @param {String|Object} data - request data
* @param {Object} opts - function options
* @param {String} [opts.protocol='https'] - request protocol
* @param {String} [opts.hostname='api.travis-ci.org'] - endpoint hostname
* @param {Number} [opts.port] - endpoint port
* @param {String} [opts.pathname='/'] - resource pathname
* @param {String} [opts.token] - Travis CI access token
* @param {String} [opts.accept='application/vnd.travis-ci.2+json'] - media type
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function update( data, opts, clbk ) {
	factory( opts, clbk )( data );
} // end FUNCTION update()


// EXPORTS //

module.exports = update;
