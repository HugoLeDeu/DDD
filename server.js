/* DDD Server */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server;
var start;
var stop;

// Déclaration des propriétés du serveur
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 5000));

// Déclaration des accès au serveur
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }

});

app.use('/api/planification-entretien', /* middleware, */ require('./routes/planification-entretien.js'));

// Lancement du serveur
start = function () {
    server = app.listen(app.get('port'));
}

// Arrêt du serveur
stop = function () {
    server.close();
}

// Export du serveur (pour les tests)
exports.start = start;
exports.stop = stop;
exports.port = app.get('port');