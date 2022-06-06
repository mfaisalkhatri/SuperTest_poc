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
const { expect } = require('chai');
const userdata = require('../testdata/userdata.json');

describe('Post API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('should successfully pass the test for post api', async () => {
		const response = await request(baseurl)
			.post('/api/users')
			.send(userdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');

		expect(response.statusCode).to.be.equal(201);
		expect(response.body.name).to.be.equal('Faisal Khatri');
		expect(response.body.job).to.be.equal('QA');
		expect(response.body.id).not.to.be.null;
		expect(response.body.createdAt).not.to.be.null;
	});
});