module.exports = require('spc').describe('merge', function () {
	var merge = require('../merge');

	before(function () {
		should();
	});

	beforeEach(function () {
		sinon.spy(merge, 'isArray');
		sinon.spy(merge, 'isObject');
		sinon.spy(merge, 'assign');
		sinon.spy(merge, 'append');
	});

	afterEach(function () {
		merge.isArray.restore();
		merge.isObject.restore();
		merge.assign.restore();
		merge.append.restore();
	});

	test('two objects', function () {
		var objectA = {a: 'a'},
		    objectB = {b: 'b'};
		expect(merge(objectA, objectB)).to.equal(undefined);
		objectA.b.should.equal(objectB.b);
	})
});

require('spc/reporter/dot')(module.exports);