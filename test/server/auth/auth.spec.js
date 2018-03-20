const request = require("request");
const server = require('../../../bin/www');


const base_url = "http://localhost:3000/";

describe("Hello World Server", function() {
    beforeEach(function() {
        server.start({ port: 3000 }, function() {});
    });

    describe("Signin POST /", function() {
        it("returns status code 200", function(done) {

            request.post({
                url: base_url + 'auth/signin',
                json: true,
                body: {
                    email: "mpanichella@live.com",
                    password: "d9ff545c1f9a84ac548a4d329f455955"
                }
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        // it("returns Hello World", function(done) {
        //     request.post(base_url, function(error, response, body) {
        //         expect(body).toBe("Hello World");
        //         done();
        //     });
        // });

        afterEach(function() {
            server.close();
        });
    });
});