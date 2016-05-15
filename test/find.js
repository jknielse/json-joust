var assert = require('assert');
var jjoust = require('../index');

describe('Testing findPath', function() {
  it('single key', function (done) {
    var input = {
      'test': 1
    }
    var expect = {
      'test': 1
    }
    assert.deepEqual(jjoust.findPath(1, input), expect);
    done();
  });

  it('double key', function (done) {
    var input = {
      'test': 'one',
      'other': 'two'
    }
    var expect = {
      'test': 'one'
    }
    assert.deepEqual(jjoust.findPath('one', input), expect);
    done();
  });

  it('deeper key', function (done) {
    var input = {
      'test': {
        'deeper': 1
      }
    }
    var expect = {
      'test':  {
        'deeper': 1
      }
    }
    assert.deepEqual(jjoust.findPath(1, input), expect);
    done();
  });

  it('simple array', function (done) {
    var input = [
      {
        'test': {
          'deeper': 2
        }
      },
      {
        'test': {
          'otherpath': 1
        }
      }
    ]
    var expect = {
      'test':  {
        'otherpath': 1
      }
    }
    assert.deepEqual(jjoust.findPath(1, input), expect);
    done();
  });

  it('multiple right answers', function (done) {
    var input = [
      {
        'test': {
          'deeper': 1
        }
      },
      {
        'test': {
          'otherpath': 1
        }
      }
    ]
    var expect = {
      'test':  {
        'deeper': 1
      }
    }
    assert.deepEqual(jjoust.findPath(1, input), expect);
    done();
  });

  it('simple regex', function (done) {
    var input = {
      'test': {
        'deeper': 'a'
      }
    }
    var expect = {
      'test':  {
        'deeper': 'a'
      }
    }
    assert.deepEqual(jjoust.findPath(/(?:a|b)/, input), expect);
    done();
  });
})
