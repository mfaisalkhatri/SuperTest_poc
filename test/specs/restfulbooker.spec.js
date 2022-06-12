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
const booking = require('../data/booking.json');
const userauthdata = require('../data/userauthdata.json');
const updatedbooking = require('../data/updatedbooking.json');
const { RESTFUL_BASE_URL } = require('../constants/urls');

describe('Restful Booker API Tests', () => {
    let bookingId;
    let token;

    before("Generate Token", async () => {
        const response = await request(RESTFUL_BASE_URL)
            .post('/auth')
            .send(userauthdata)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .disableTLSCerts();

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.token).not.to.be.null;
        token = response.body.token;
    });


    it('should successfully create a booking', async () => {
        const response = await request(RESTFUL_BASE_URL)
            .post('/booking')
            .send(booking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.bookingid).not.to.be.null;
        expect(response.body.booking.firstname).to.be.equal(booking.firstname);
        expect(response.body.booking.lastname).to.be.equal(booking.lastname);
        expect(response.body.booking.totalprice).to.be.equal(booking.totalprice);
        expect(response.body.booking.depositpaid).to.be.equal(booking.depositpaid);
        expect(response.body.booking.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
        expect(response.body.booking.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
        expect(response.body.booking.additionalneeds).to.be.equal(booking.additionalneeds);
        bookingId = response.body.bookingid;
    });

    it('should fetch the booking of the provided booking id', async () => {
        const response = await request(RESTFUL_BASE_URL)
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.firstname).to.be.equal(booking.firstname);
        expect(response.body.lastname).to.be.equal(booking.lastname);
        expect(response.body.totalprice).to.be.equal(booking.totalprice);
        expect(response.body.depositpaid).to.be.equal(booking.depositpaid);
        expect(response.body.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.be.equal(booking.additionalneeds);
    });

    it('should update the booking of the provided booking id using Put request', async () => {
        const response = await request(RESTFUL_BASE_URL)
            .put('/booking/' + bookingId)
            .send(updatedbooking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.firstname).to.be.equal(updatedbooking.firstname);
        expect(response.body.lastname).to.be.equal(updatedbooking.lastname);
        expect(response.body.totalprice).to.be.equal(updatedbooking.totalprice);
        expect(response.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
    });

    it('should update the firstname and lastname of booking of the provided booking id', async () => {
        var firstname = 'Michael';
        var lastname = 'Trenor';
        const response = await request(RESTFUL_BASE_URL)
            .patch('/booking/' + bookingId)
            .send({ firstname: firstname, lastname: lastname })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token);

        expect(response.statusCode).to.be.equal(200);
        expect(response.body.firstname).to.be.equal(firstname);
        expect(response.body.lastname).to.be.equal(lastname);
        expect(response.body.totalprice).to.be.equal(updatedbooking.totalprice);
        expect(response.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
        expect(response.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
        expect(response.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
        expect(response.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
    });

    it('should Delete the booking of the provided booking id', async () => {
        const response = await request(RESTFUL_BASE_URL)
            .delete('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token);

        expect(response.statusCode).to.be.equal(201);
    });

    it('should show 404 status code for deleted booking id', async () => {
        const response = await request(RESTFUL_BASE_URL)
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(response.statusCode).to.be.equal(404);
    });

});