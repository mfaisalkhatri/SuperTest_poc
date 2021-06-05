const request = require('supertest');
const expect = require('chai').expect;
const userdata = require('../testdata/userdata.json');

describe('Post API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('should successfully pass the test for post api', (done) => {
		request(baseurl)
			.post('/api/users')
			.send(userdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(201);
				expect(res.body.name).to.be.equal('Faisal Khatri');
				expect(res.body.job).to.be.equal('QA');
				expect(res.body.id).not.to.be.null;
				expect(res.body.createdAt).not.to.be.null;
				done();
			});
	});
});
