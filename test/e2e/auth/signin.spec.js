const server = require('../../../bin/www');

describe('SignIn Page', function() {
    beforeEach(function() {
        server.start({ port: 3000 }, function() {});
    });

    it('Fail Login', function() {


        browser.get('http://localhost:3000/auth/#/signin');

        element(by.id('email')).clear().sendKeys('mpanichella@live.com');
        element(by.id('password')).clear().sendKeys('34518147');
        element(by.id('signin')).click();

        let loginFail = element.all(by.css('.kpx_login'));
        expect(loginFail.count()).toEqual(1);

    });

    afterEach(function() {
        server.close();
    });
});