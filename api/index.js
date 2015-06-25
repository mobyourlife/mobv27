// server.js

// BASE SETUP
// =============================================================================

// load config
var config = require('../config/config');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE CONNECTION
// =============================================================================
mongoose.connect(config.api.database);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// LOAD CONTROLLERS
var feeds = require('./controllers/feeds');

// REGISTER OUR ROUTES -------------------------------
router.get('/feeds/:direction/:index', feeds.getFeeds);

// START THE SERVER
// =============================================================================
app.listen(config.api.port);
console.log('API listening on port ' + port);