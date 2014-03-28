/**
 * Require Dependencies
 */
var restify    = require('restify')
    , mongoose = require('mongoose')
    , routes   = require('./routes');

/**
 * Create Server & Define Settings
 */
var server = restify.createServer({
    name: 'pbnplay',
    version: '1.0.0'
});

/**
 * Common Handlers
 */
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());

/**
 * Connect to Mongo Database
 */
mongoose.connect('mongodb://localhost/pbnplay', function(err) {
    // assign connection to var so we can pass it down the chain
    var db = mongoose.connection;

    // handle connection error
    db.on('error', console.error.bind(console, 'connection error:'));

    // handle connection success
    db.once('open', function callback () {
        /**
         * Start Routing API Calls
         */
        routes.Users.route(server, db);

    });

});

/**
 * Start Server & Bind to Port
 */
server.listen(3000, function () {
    console.log('listening on port %s',3000);
});