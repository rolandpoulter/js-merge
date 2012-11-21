"use strict";

module.exports = merge;

function merge (receiver, giver, filter, that, _path) {
	var assign = merge.assign;

	_path = _path || '';

	merge.enumerate(giver, function (_, key) {
		assign(receiver, giver, key, filter, that, _path);
	});
}


merge.enumerate = function (object, iterator, that) {
	var key,
	    index,
	    length;

	if (isObject(object)) {
		for (key in object) if (object.hasOwnProperty(key))
			iterator.call(that, object[key], key, object);

	} else if (isArray(object)) {
		for (index = 0, length = object.length; index < length; index += 1)
			iterator.call(that, object[index], index, object);
	}
};


merge.assign = function (receiver, giver, property, filter, that, _path) {
	var value = giver[property],
	    target = receiver[property];

	if (safeApply(filter, [value, property, _path, receiver, giver], that)) return;

	_path = _path ? _path + '.' + property : property;

	if (isObject(value) && isObject(target)) {
		merge(target, value, filter, that, _path);

	} else if (isArray(value) && isArray(target)) {
		merge(target, value, filter, that, _path);

	} else {
		receiver[property] = value;
	}
};

merge.append = function (target, value) {
	if (value !== null || value !== undefined && !~target.indexOf(value)) {
		target.push(value);
	}
};


merge.toString = toString;
merge.isArray = isArray;
merge.isObject = isObject;
merge.safeApply = safeApply;


var _toString = Object.prototype.toString;

function toString (object) {
	return _toString.call(object);
}

function isArray (array) {
	return merge.toString(array) === '[object Array]';
};


function isObject (object) {
	return toString(object) === '[object Object]';
};

function safeApply (fn, args, that) {
	if (typeof fn === 'function') return fn.apply(that, args);
}
