const request = require('supertest');
const expect = require('chai').expect;

describe('Patch API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('should successfully pass the test for patch request', (done) => {
		request(baseurl)
			.patch('/api/users/2')
			.send({ name: 'Michael', job: 'Tech Lead' })
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.name).to.be.equal('Michael');
				expect(res.body.job).to.be.equal('Tech Lead');
				expect(res.body.updatedAt).not.to.be.null;
				done();
			});
	});
});