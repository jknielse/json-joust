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

  it('arrays with sisters', function (done) {
    var plan = {
      'test': {
        'thing': 'val'
      }
    }
    var input = {
      'sister': 3,
      'test': [
        {
          'thing': 1
        },
        {
          'thing': 2
        }
      ]
    }
    var expect = [
      {
        'val': 1,
      },
      {
        'val': 2,
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  })

  it('regex key test', function (done) {
    var plan = {
      'test': {
        '/thing.*/': 'val'
      }
    }
    var input = {
      'test': [
        {
          'thingggg': 1
        },
        {
          'thingy': 2
        }
      ]
    }
    var expect = [
      {
        'val': 1,
      },
      {
        'val': 2,
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  })

  it('larger test', function (done) {
    var plan = {
      'hereis': {
        'some': {
          'very': {
            'deep': {
              'plan': {
                'here': 'val'
              }
            }
          }
        }
      }
    }
    var input = { hereis: [ 
      {
        'some': {
          'testt': 3,
          'very': [
            {
              'deep': {
                'plan': [{
                  'here': 1
                }]
              }
            },
            {
              'deep': {
                'plan': {
                  'here': 2
                }
              }
            },
            {
              'deep': {
                'plan': [{
                  'here': 3
                }, {
                  'here': 4
                }]
              }
            },
            {
              'deep': {
                'plan': {
                  'here': 4
                }
              }
            }
          ]
        }
      },
      {
        'some': {
          'very': {
            'deep': {
              'plan': [
                {
                  'here': 5
                },
                {
                  'here': 6
                },
                {
                  'here': 7
                },
                {
                  'here': 8
                },
                {
                  'here': 9
                }
              ]
            }
          }
        }
      },
      {

      }
    ]}
    var expect = [
      {
        'val': 1
      },
      {
        'val': 2
      },
      {
        'val': 3
      },
      {
        'val': 4
      },
      {
        'val': 4
      },
      {
        'val': 5
      },
      {
        'val': 6
      },
      {
        'val': 7
      },
      {
        'val': 8
      },
      {
        'val': 9
      }
    ]
    assert.deepEqual(jjoust.joust(plan, input), expect);
    done();
  });
})
