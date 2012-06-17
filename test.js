module.exports = require('spc').describe('merge', function () {
	var merge = require('./merge');

	before(function () {
		should();
	});
});

require('spc/reporter/dot')(module.exports);