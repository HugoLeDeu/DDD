var mongoose = require('mongoose');
var server = require('./server.js');

// Démarrage de l'application
console.log("Connecting to MongoDB...");
var host = process.env.MONGOLAB_URI || 'mongodb://localhost/ddd';

mongoose.connect(host, function (error) {

    if (error) {
        console.error(error);
    } else {
        console.log('Successfully connected to MongoDB --> ' + (host));
        server.start();
        console.log('Application listening on port --> ', server.port);
    }
    
});