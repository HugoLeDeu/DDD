/*global describe, it, beforeEach, afterEach, process*/

var assert = require('assert');
var request = require("supertest-as-promised");
var utils = require('../utils.js');
var dbUtils = require('../db-utils.js');
var server = require('../../server.js');
var mongoose = require('mongoose');

describe('Tests for : /planification-entretien', function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost/ddd', function (err) {
            dbUtils.populate("test/resources/data.json").then(function () {
                server.start();
                done();
            });
        });
    });

    after(function (done) {
        server.stop();
        mongoose.disconnect(function () {
            done();
        });
    });

    describe('POST /disponibilite', function () {

        it("A recruiter should be available and qualify", function (done) {
            request(utils.getRootUrl()).post('/api/planification-entretien/disponibilite')
            .send({ techno: '.Net', profile: "3 ans", date: '01/08/2019' })
            .expect(200, { message: "Ok" })
                .then(function(res) {
                    done();
                });
        });

        /*it("A candidate should be unavailable", function (done) {
            userToken = res.body.token;
            return request(utils.getRootUrl())
                .post('/api/planification-entretien')
                .send({ name: 'User 2', date: '14/02/2019' })
                .expect(200, { message: "Candidate isn't available" });
        });

        
        it("Recruiters should be unavailable", function (done) {
            userToken = res.body.token;
            return request(utils.getRootUrl())
                .post('/api/planification-entretien')
                .send({ name: 'User 3', date: '16/02/2019' })
                .expect(200, { message: "No recruiters available" });
        });

        it("Recruiters should be unqualify", function (done) {
            userToken = res.body.token;
            return request(utils.getRootUrl())
                .post('/api/planification-entretien')
                .send({ name: 'User 4', date: '18/02/2019' })
                .expect(200, { message: "No recruiters qualify" });
        });*/

    });

});
