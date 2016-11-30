var request = require('supertest'),
    app = require('./app');

/************************************************************
 * ROOT *
************************************************************/
describe('Requests to the root path', () => {
    it('expects a 200 status code', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('expects a text/html content', done => {
        request(app)
            .get('/')
            .expect('Content-Type', /text\/html/, done);
    });
    it('expects an index file with FCC', done => {
        request(app)
            .get('/')
            .expect(/fcc/i, done);
    });
});


/************************************************************
 * TIMESTAMPT *
************************************************************/
describe('Request to the timestampt path', () => {
    it('expects a 200 status code', done => {
        request(app)
            .get('/timestampt')
            .expect(200, done);
    });
    it('expects a text/html content', done => {
        request(app)
            .get('/timestampt')
            .expect('Content-Type', /text\/html/, done);
    });
    it('expects a timestampt file with Timestamp microservice', done => {
        request(app)
            .get('/timestampt')
            .expect(/timestamp/i, done);
    });
});

describe('Request to the timestampt path with a parameter', done => {
    it(`expects a 200 status code and the body
        when a timestampt is sent as a parameter`, done => {

        request(app)
            .get('/timestampt/December%2015,%202015')
            .expect(200, done);
    });
    it('expects the date in unix and natural language format when gave it as natural', done => {
        let body = {
            natural: "December 2, 2015",
            unix: 1450134000000
        };

        request(app)
            .get('/timestampt/December%2015,%202015')
            .expect(200, body, done);
    });
    it('expects the date in unix and natural language format when gave it as unix', done => {
        let body = {
            natural: "December 2, 2015",
            unix: 1450134000000
        };

        request(app)
            .get('/timestampt/1450134000000')
            .expect(200, body, done);
    });
    it('expects an object whose properties are null', done => {
        let body = {
            natural: null,
            unix: null
        };

        request(app)
            .get('/timestampt/a%2015,%202015')
            .expect(200, body, done);
    });
});


/************************************************************
 * WHOAMI *
************************************************************/

describe('Request to the whoami path', () => {
    it('expects a 200 status code', done => {
        request(app)
            .get('/whoami')
            .expect(200, done);
    });
    it('expects a content-type html/text', done => {
        request(app)
            .get('/whoami')
            .expect('Content-Type', /text\/html/, done);
    });
});