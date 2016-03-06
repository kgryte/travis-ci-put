'use strict';

// MODULES //

var tape = require( 'tape' );
var data = require( './../lib/data.js' );


// FIXTURES //

var d = '{"hook":{"id":42,"active":true}}';


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof data, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function extracts a `data` property', function test( t ) {
	var out = data( {'data':d} );
	t.equal( out, d, 'returns a string' );
	t.end();
});

tape( 'the function serializes a `data` property if the property value is an object', function test( t ) {
	var out = data( {'data':JSON.parse(d)} );
	t.equal( out, d, 'returns a string' );
	t.end();
});
