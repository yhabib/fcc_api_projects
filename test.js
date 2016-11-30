var request = require('supertest'),
    app = require('./app');


describe('Requests to the root path', () => {
    it('returns a 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end(error => {
                if(error) throw error;
                done();
            });
    });
});
