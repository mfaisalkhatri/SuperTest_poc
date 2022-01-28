/*
   Copyright 2022 Mohammad Faisal Khatri

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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