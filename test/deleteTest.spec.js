const request = require('supertest');
const expect = require('chai').expect;

describe('Delete API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('should successfully pass the test for delete request', (done) => {
		request(baseurl)
			.delete('/api/users/2')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(204);
				done();
			});
	});
});