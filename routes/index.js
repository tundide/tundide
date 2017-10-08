let express = require('express');
let session = require('./auth/session');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { user: req.user });
});

router.get('/admin', function(req, res, next) {
    res.render('admin', { user: req.user });
});

router.get('/auth', function(req, res, next) {
    res.render('auth');
});

router.get('/terminal', function(req, res, next) {
    res.render('terminal', { user: req.user });
});

router.get('/logout', session.authorize(), function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;