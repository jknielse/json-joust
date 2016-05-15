



var isRegex = function (r) {
  return r instanceof RegExp;
}

var isArray = function (a) {
  return Array.isArray(a);
}

var isString = function(s) {
  return typeof s === 'string';
}

var isAnyObject = function(o) {
  return o != null && (typeof o === 'object' || typeof o === 'function');
}

var matches = function (test, item) {
  if (isRegex(test)) {
    return !!item.match(test);
  } else {
    return test === item;
  }
}

var zip = function (objects) {
  var zippedObject = {};
  objects.forEach(function (object) {
    Object.keys(object).forEach(function (key) {
      if (zippedObject[key] === null || zippedObject[key] === undefined) return zippedObject[key] = object[key];
    });
  });
  return zippedObject;
}

var zipLists = function (lists) {
  var results = [];
  while (lists[0].length > 0) {
    var sublist = [];
    lists.forEach(function (list) {
      if (list.length === 0) throw new Error('Tried to zip lists that were not the same length!');
      sublist.push(list.pop());
    })
    results.push(zip(sublist));
  }
  return results;
}

var nullLeafObject = function (plan) {
  if (!isAnyObject(plan)) return {[plan]: null};
  if (isArray(plan)) throw new Error('Plans cannot contain arrays, silly.');
  var results = [];
  Object.keys(plan).forEach(function (key) {
    results.push(nullLeafObject(plan[key]));
  });
  return zip(results);
}

var joust = function (plan, input) {
  if (!isAnyObject(plan)) return [{[plan]: input}];
  if (!isAnyObject(input)) return [nullLeafObject(plan)];
  if (isArray(plan)) throw new Error('Plans cannot contain arrays, silly.');
  if (isArray(input)) {
    var results = [];
    input.forEach(function (i) {
      results = results.concat(joust(plan, i));
    })
    return results;
  }
  if (Object.keys(plan).length === 0) throw new Error('Plans cannot contain empty objects. What does that even mean?');
  if (Object.keys(input).length === 0) return [nullLeafObject(plan)];
  if (Object.keys(plan).length > 1) {
    var results = [];
    Object.keys(plan).forEach(function (key) {
      results.push(joust({[key]: plan[key]}, input));
    });
    return zipLists(results);
  }
  if (Object.keys(input).length > 1) {
    var results = [];
    Object.keys(input).forEach(function (key) {
      results.push(joust(plan, {[key]: input[key]}));
    });
    return zipLists(results);
  }
  var inputKey = Object.keys(input)[0];
  var planKey = Object.keys(plan)[0];
  if (matches(inputKey, planKey)) return joust(plan[planKey], input[inputKey]);
  return [nullLeafObject(plan)];
}

var hasAny = function (o) {
  var any = false;
  Object.keys(o).forEach(function (key) {
    if (o[key] !== null) any = true;
  });
  return any;
}

exports.joust = function (plan, input) {
  return joust(plan, input).filter(hasAny);
}

exports.findPath = function (match, input) {
  if (!isAnyObject(input)) {
    // If the input is falsey, then we'll just cheat.
    if (matches(match, input)) return input || true;
  }
  if (isArray(input)) {
    var potentialPath = false;
    input.forEach(function (member) {
      potentialPath = potentialPath || exports.findPath(match, member);
    });
    return potentialPath;
  }
  var potentialPath = false;
  Object.keys(input).forEach(function (key) {
    if (!potentialPath) {
      var p = exports.findPath(match, input[key])
      if (p) {
        potentialPath = {[key]: exports.findPath(match, input[key])};
      }
    }
  });
  return potentialPath;
}
