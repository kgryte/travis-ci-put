'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var update = require( './../lib/update.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof update, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		update( null, noop );
	}
	function bar() {
		update( {'port':'beep'}, noop );
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			update( opts, value );
		};
	}
});

tape( 'if a `port` option is not specified and the protocol is `https`, the default port is `443`', function test( t ) {
	var update;
	var opts;

	update = proxyquire( './../lib/update.js', {
		'./query.js': query
	});

	opts = getOpts();
	opts.protocol = 'https';
	delete opts.port;

	update( opts, noop );

	function query( opts ) {
		t.equal( opts.port, 443, 'sets the default port to `443` for HTTPS' );
		t.end();
	}
});

tape( 'if a `port` option is not specified and the protocol is `http`, the default port is `80`', function test( t ) {
	var update;
	var opts;

	update = proxyquire( './../lib/update.js', {
		'./query.js': query
	});

	opts = getOpts();
	opts.protocol = 'http';
	delete opts.port;

	update( opts, noop );

	function query( opts ) {
		t.equal( opts.port, 80, 'sets the default port to `80` for HTTP' );
		t.end();
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when fetching resources', function test( t ) {
	var update;
	var opts;

	update = proxyquire( './../lib/update.js', {
		'./query.js': query
	});

	opts = getOpts();
	update( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var update;
	var opts;

	update = proxyquire( './../lib/update.js', {
		'./query.js': query
	});

	expected = results;

	opts = getOpts();
	update( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, results );
		}
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});
