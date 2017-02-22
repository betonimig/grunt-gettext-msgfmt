'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gettext_msgfmt = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  rutojava: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/ru.mo');
    var expected = grunt.file.read('test/expected/ru.mo');
    test.equal(actual, expected, 'should compile PO to MO with msgfmt.');

    test.done();
  },
  rutomo: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/target/classes/com/example/translations/messages_ru.class');
    var expected = grunt.file.read('test/expected/messages_ru.class');
    test.equal(actual, expected, 'should compile PO to JAVA with msgfmt.');

    test.done();
  },
};
