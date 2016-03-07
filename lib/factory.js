'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var query = require( './query.js' );


// VARIABLES //

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for updating a Travis CI resource.
*
* @param {Object} options - function options
* @param {String} [options.protocol='https'] - request protocol
* @param {String} [options.hostname='api.travis-ci.org'] - endpoint hostname
* @param {Number} [options.port] - endpoint port
* @param {String} [options.pathname='/'] - resource pathname
* @param {String} [options.token] - Travis CI access token
* @param {String} [options.accept='application/vnd.travis-ci.2+json'] - media type
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for updating resources
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( opts.port === null ) {
		if ( opts.protocol === 'https' ) {
			opts.port = DEFAULT_HTTPS_PORT;
		} else {
			opts.port = DEFAULT_HTTP_PORT;
		}
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: update( data )
	*	Updates endpoint resources.
	*
	* @param {String|Object} data - request data
	* @returns {Void}
	*/
	return function update( data ) {
		if ( !isString( data ) && !isObject( data ) ) {
			throw new TypeError( 'invalid input argument. Request data must be either a string or an object. Value: `' + data + '`.' );
		}
		query( data, opts, done );
		/**
		* FUNCTION: done( error, results )
		*	Callback invoked after completing query.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object[]} results - query results
		* @returns {Void}
		*/
		function done( error, results ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null, results );
		} // end FUNCTION done()
	}; // end FUNCTION update()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
