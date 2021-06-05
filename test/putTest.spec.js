const request = require('supertest');
const expect = require('chai').expect;

describe('Put API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('should successfully pass the test for post api', (done) => {
		request(baseurl)
			.put('/api/users/2')
			.send({ name: 'Joseph', job: 'Business Analyst' })
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.name).to.be.equal('Joseph');
				expect(res.body.job).to.be.equal('Business Analyst');
				expect(res.body.updatedAt).not.to.be.null;
				done();
			});
	});
});
