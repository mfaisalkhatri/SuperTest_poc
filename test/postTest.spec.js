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

import request from 'supertest'
import { expect } from 'chai';
import userdata from '../testdata/userdata.json' assert { type: 'json' };

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