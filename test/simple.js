var assert = require('assert');
var jjoust = require('../index');

describe('Simple Tests', function() {
  it('single key with object', function (done) {
    var plan = {
      'test': 'keyname'
    }
    var input = {
      'test': 1
    }
    var expect = [{
      'keyname': 1
    }]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('single key with array', function (done) {
    var plan = {
      'test': 'keyname'
    }
    var input = [{
      'test': 1
    }]
    var expect = [{
      'keyname': 1
    }]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('single key with array of objects', function (done) {
    var plan = {
      'test': 'keyname'
    }
    var input = [
      {
        'test': 1
      },
      {
        'test': 2
      }
    ]
    var expect = [
      {
        'keyname': 1
      },
      {
        'keyname': 2
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('multiple key with one object', function (done) {
    var plan = {
      'test': 'keyname',
      'other_test': 'second_keyname',
    }
    var input = {
      'test': 1,
      'other_test': 2,
    }
    var expect = [
      {
        'keyname': 1,
        'second_keyname': 2
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('multiple key with one array', function (done) {
    var plan = {
      'test': 'keyname',
      'other_test': 'second_keyname',
    }
    var input = [{
      'test': 1,
      'other_test': 2,
    }]
    var expect = [
      {
        'keyname': 1,
        'second_keyname': 2
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('multiple key with array of objects', function (done) {
    var plan = {
      'test': 'keyname',
      'other_test': 'second_keyname',
    }
    var input = [
      {
        'test': 1,
        'other_test': 2,
      },
      {
        'test': 3,
        'other_test': 4,
      }
    ]
    var expect = [
      {
        'keyname': 1,
        'second_keyname': 2
      },
      {
        'keyname': 3,
        'second_keyname': 4
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('multiple key with array of objects with missing part', function (done) {
    var plan = {
      'test': 'keyname',
      'other_test': 'second_keyname',
    }
    var input = [
      {
        'test': 1,
        'other_test': 2,
      },
      {
        'test': 3,
      }
    ]
    var expect = [
      {
        'keyname': 1,
        'second_keyname': 2
      },
      {
        'keyname': 3,
        'second_keyname': null
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });

  it('nulled out objects should be deleted', function (done) {
    var plan = {
      'test': 'keyname',
      'other_test': 'second_keyname',
    }
    var input = [
      {
        'test': 1,
        'other_test': 2,
      },
      {
      }
    ]
    var expect = [
      {
        'keyname': 1,
        'second_keyname': 2
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });
})
