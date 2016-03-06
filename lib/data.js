'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// DATA //

/**
* FUNCTION: data( opts )
*	Extracts request data from query options.
*
* @param {Object} opts - query options
* @param {String|Object} opts.data - request data
* @returns {String} serialized request data
*/
function data( opts ) {
	if ( isString( opts.data ) ) {
		return opts.data;
	}
	return JSON.stringify( opts.data );
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
