var fs = require('fs'),
    mongoose = require('mongoose'),
    populate,
    clean;

// Permet de supprimer l'ensemble des collections d'une base

clean = function () {
    return new Promise(function (resolve, reject) {
        for (var collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].remove(function () { });
        }
        resolve();
    });
}

// Permet d'insérer des données (utilisateurs, disponibilités...) retourne une promise

populate = function (jsonPath) {

    return new Promise(function (resolve, reject) {
        clean().then(function () {

            var data = JSON.parse(fs.readFileSync(jsonPath)),
                users = data[0].documents,
                addedUsers = [];

            for (var index = 0; index < users.length; index += 1) {
                var user = users[index];
                var idx = index < 10 ? "00"+index : index < 100 ? "0"+index : index;
                user._id = mongoose.Types.ObjectId("1edd40c86762e0fb12000" + idx);
                user.isCandidate = false;
                user.availabilities = [];
                addedUsers.push(user);
            }

            for (var collectionIndex = 0; collectionIndex < data.length; collectionIndex += 1) {
                var documents = data[collectionIndex].documents;
                var name = data[collectionIndex].collection;
                if (name != "users") {
                    var month;
                    switch (name) {
                        case "availabilities_january" :
                            month = "01";
                            break;
                        case "availabilities_february" :
                            month = "02";
                            break;
                        case "availabilities_march" :
                            month = "03";
                            break;
                        case "availabilities_april" :
                            month = "04";
                            break;
                        case "availabilities_may" :
                            month = "05";
                            break;
                        case "availabilities_june" :
                            month = "06";
                            break;
                        case "availabilities_july" :
                            month = "07";
                            break;
                        case "availabilities_august" :
                            month = "08";
                            break;
                        case "availabilities_september" :
                            month = "09";
                            break;
                        case "availabilities_october" :
                            month = "10";
                            break;
                        case "availabilities_november" :
                            month = "11";
                            break;
                        case "availabilities_december" :
                            month = "12";
                            break;
                        default :
                            month = null;
                    }
                    if (month) {
                        for (var documentIndex = 0; documentIndex < documents.length; documentIndex += 1) {
                            var availability = documents[documentIndex];
                            addedUsers.forEach(function(user) {
                                if (availability.name == user.name) {
                                    for (var i = 1; i <= 31; i++) {
                                        if (availability[i] != null) {
                                            var available = availability[i] == 1 ? true : false;
                                            var day = i > 9 ? i : "0"+i;
                                            var d = new Date();
                                            var year = d.getFullYear();
                                            user.availabilities.push({ date: new Date(month+"/"+day+"/"+year), available: available });
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        // other traitments
                    }
                }
            }

            var cpt = 0;
            var total = users.length;

            addedUsers.forEach(function(user) {
                mongoose.connection.collections["users"].insert(user, {}, function() {
                    cpt++;
                    if (cpt == total) {
                        resolve();
                    }
                });
            });
            
        })
        .catch(function (err) {
            console.log(err);
            reject(err);
        });
    });
}

exports.populate = populate;