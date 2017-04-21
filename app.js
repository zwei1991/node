//modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash  = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var routes = require('./routes');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var app = express();
//port
var port = process.env.PORT || 2000;
//connection to mongodb
mongoose.connect(config.dbConnectionLink());

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ejs for templating
app.set('view engine', 'ejs');

//passport
var localpass = require('./config/passport');
localpass(passport);
app.use(session({secret: 'secretkey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//setupController(app);
apiController(app, passport);

// run routes
routes(app, passport);

app.listen(port);

