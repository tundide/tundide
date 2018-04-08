require('./jobs.js');
require('./mercadopago.js');
let express = require('express');
let session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
const compression = require('compression');
let passport = require('passport');
let mongoose = require('mongoose');
let cors = require('cors');
let User = require('./models/user');
let env = require('node-env-file');

env(__dirname + '/.env', { raise: false });

let strategies = require("./routes/auth/strategies.js")();

mongoose.connect(process.env.MONGODB_URI, {
    "sslValidate": true
}, function(err) {
    if (err) {
        console.log(err);
    }
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', '/favicon/favicon.ico')));
app.use(logger('dev'));
app.use(compression());
app.use(cors({ origin: process.env.SITE_URL }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(strategies.initialize());
app.use(passport.session());

if (process.env.NODE_ENV == 'production') {

    app.get('/*', function(req, res, next) {

        if (req.url.indexOf("/js/") === 0) {
            res.setHeader("Cache-Control", "public, max-age=2592000");
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
        }
        next();
    });

    app.get('*.bundle.js', function(req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')));


app.use(function(req, res, next) {
    if (req.headers.authorization) {
        let token = req.headers.authorization;
        User.findOne({
            $or: [{ 'google.token': token },
                { 'outlook.token': token },
                { 'facebook.token': token },
                { 'twitter.token': token },
                { 'linkedin.token': token },
                { 'local.token': token }
            ]
        }, function(error, result) {
            if (error) return;

            req.user = result;
            next();
        });
    } else {
        next();
    }
});

let routes = require('./routes/routes');
routes(app, passport, mongoose);

app.use((req, res, next) => { // TODO: Verificar el funcionamiento de esto
    res.status(404);
    res.json({
        "error": "route not found"
    });
});

app.use((err, req, res, next) => {
    res.status(500);
    res.json(`${err}`);
});

module.exports = app;