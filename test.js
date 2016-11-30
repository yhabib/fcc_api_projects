var request = require('supertest'),
    app = require('./app');


describe('Requests to the root path', () => {
    it('returns a 200 status code', done => {
        request(app)
            .get('/')
            .expect(200, done)    //.expect(200,done)
            .end(error => {
                if(error) throw error;
                done();
            });
    });
});

describe('Request to the timestampt path', () => {
    it('returns a 200 status code', done => {
        request(app)
            .get('/timestampt')
            .expect(200, done);
    });

    it(`returns a 200 status code and the body
        when a timestampt is sent as a parameter`, done => {
        let body = "December 15, 2015";

        request(app)
            .get('/timestampt/December%2015,%202015')
            .expect(200, body, done);
    });
});



