/*jslint smarttabs:true */

"use strict";

var toString = Object.prototype.toString;

merge.toString = function (object) {
	return toString.call(object);
}

merge.isArray = function (array) {
	return merge.toString(array) === '[object Array]';
};

merge.isObject = function (object) {
	return merge.toString(object) === '[object Object]';
};

module.exports = merge;

function merge (receiver, giver) {
	var key,
	    index,
	    length,
	    isArray = merge.isArray,
	    isObject = merge.isObject;

	if (merge.isObject(giver)) {
		for (key in giver) if (giver.hasOwnProperty(key)) {
			merge.assign(receiver, giver, key);
		}

	} else if (merge.isArray(giver)) {
		for (index = 0, length = giver.length; index < length; index += 1) {
			merge.assign(receiver, giver, index);
		}
	}
}

merge.assign = function (receiver, giver, property) {
	var value = giver[property],
		  target = receiver[property];

	if (merge.isObject(value) && merge.isObject(target)) {
			merge(target, value);

	} else if (merge.isArray(target)) {
		if (merge.isArray(value)) value.forEach(function (value) {
			merge.append(target, value);
		});

		else merge.arrayAssign(target, value);

	} else receiver[property] = value;
};

merge.append = function (target, value) {
	if (value !== null || value !== undefined && !~target.indexOf(value)) {
		target.push(value);
	}
}
