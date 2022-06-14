const request = require('supertest');

const AccepJSON = "application/json";
const ContentType = "Content-Type";

async function getCall(baseurl, endpoint, query) {
    return request(baseurl)
        .get(endpoint)
        .query(query)
        .set('Accept', AccepJSON)
        .set(ContentType, AccepJSON)
        .disableTLSCerts();
}

async function postCall(baseurl, endpoint, payload) {
    return request(baseurl)
        .post(endpoint)
        .send(payload)
        .set('Accept', AccepJSON)
        .set(ContentType, AccepJSON)
        .disableTLSCerts();
}

async function putCall(baseurl, endpoint, payload) {
    return request(baseurl)
        .put(endpoint)
        .send(payload)
        .set('Accept', AccepJSON)
        .set(ContentType, AccepJSON)
        .disableTLSCerts();
}

async function putCallWithToken(baseurl, endpoint, payload, token) {
    return request(baseurl)
        .put(endpoint)
        .send(payload)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Cookie', `token=${token}`)
        .disableTLSCerts();
}

async function patchCall(baseurl, endpoint, payload) {
    return request(baseurl)
        .patch(endpoint)
        .send(payload)
        .set('Accept', AccepJSON)
        .set(ContentType, AccepJSON)
        .disableTLSCerts();
}

async function patchCallWithtoken(baseurl, endpoint, payload, token) {
    return request(baseurl)
        .patch(endpoint)
        .send(payload)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Cookie', `token=${token}`)
        .disableTLSCerts();
}

async function deleteCall(baseurl, endpoint) {
    return request(baseurl).delete(endpoint).disableTLSCerts();
}

async function deleteCallWithToken(baseurl, endpoint, token) {
    return request(baseurl)
        .delete(endpoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Cookie', `token=${token}`)
        .disableTLSCerts();
}

module.exports = {
    getCall,
    postCall,
    putCall, putCallWithToken,
    patchCall, patchCallWithtoken,
    deleteCall, deleteCallWithToken
}