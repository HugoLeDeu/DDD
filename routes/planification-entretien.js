var express = require('express');
var router = express.Router();
var moment = require('moment');

var disponibiliteUseCase = require('../use-cases/planification-entretien/disponibilite.js');
var planifierUseCase = require('../use-cases/planification-entretien/planifier.js');
var replanifierUseCase = require('../use-cases/planification-entretien/replanifier.js');
var annulerUseCase = require('../use-cases/planification-entretien/annuler.js');

var checkParams = (body, params) => {

    var ok = 0;
    params.forEach(param => {
        if (param in body && body[param] != null && body[param] != "") {
            ok++;
        }
    });
    return ok == params.length ? true : false;

}

// Vérifier les disponibilités pour un entretien : paramètres --> techno, profile, date

router.post('/disponibilite', (req, res) => {

    if (!checkParams(req.body, ["techno", "profile", "date"])) {
        res.status(400).json({ message: "Missing parameters, expected : techno, profile, date" });
    }

    var techno = req.body.techno;
    var profile = req.body.profile;
    var date = req.body.date;

    if (!moment(date, 'MM/DD/YYYY', true).isValid()) {
        res.status(400).json({ message: "Bad date format, expected : MM/DD/YYYY" });
    }

    var result = disponibiliteUseCase.run(techno, profile, date);
    res.status(result.code).json({ message: result.message });

});


// Planifier un entretien : paramètres --> nom du candidat, techno, profile, date

router.post('/planifier', (req, res) => {

    var name = req.body.name;
    var date = req.body.date;

});


// Replanifier un entretien : paramètres --> nom du candidat, date, nouvelle date

router.post('/replanifier', (req, res) => {

    var name = req.body.name;
    var date = req.body.date;

});


// Annuler un entretien : paramètres --> nom du candidat, date

router.post('/annuler', (req, res) => {

    var name = req.body.name;
    var date = req.body.date;

});

module.exports = router;