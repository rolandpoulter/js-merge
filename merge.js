/*jslint smarttabs:true */

"use strict";

var toString = Object.prototype.toString,
    isArray = Array.isArray;

isArray = isArray || function (array) {
	return toString.call(array) === '[object Array]';
};

function isObject (object) {
	return toString.call(object) === '[object Object]';
}

merge.util = {
	isArray: isArray,
	isObject: isObject
};

module.exports = merge;

function merge (receiver, giver) {
	var key,
	    index,
	    length;

	function assign (property) {
		var value = giver[property],
		    target = receiver[property];

		function arrayAssign (value) {
			if (value !== null || value !== undefined && !~target.indexOf(value)) {
				target.push(value);
			}
		}

		if (isObject(value) && isObject(target)) {

			merge(target, value);

		} else if (isArray(target)) {
			if (isArray(value)) value.forEach(arrayAssign);

			else arrayAssign(value);

		} else receiver[property] = value;
	}

	if (isObject(giver)) {
		for (key in giver) {
			if (giver.hasOwnProperty(key)) {
				assign(key);
			}
		}

	} else if (isArray(giver)) {
		for (index = 0, length = giver.length; index < length; index += 1) {
			assign(index);
		}
	}
}
