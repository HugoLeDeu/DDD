var User = require('../../model/user.js');

exports.isRecruitersAvailable = (date) => { // promise partout ? attend pas les retours

    User.find().exec().then(users => {

        var isRecuitersAvailable = false;
        users.forEach(user => {
            if (!user.isCandidate) {
                user.availabilities.forEach(availabily => {
                    if (availabily.available && availabily.date == new Date(date)) {
                        isRecuitersAvailable = true;
                    }
                });
            }
        });
        return isRecuitersAvailable;

    });

}

exports.isRecruitersQualify = (techno, profile, date) => {

    User.find().exec().then(users => {

        var isRecuitersQualify = false;
        users.forEach(user => {
            if (!user.isCandidate) {
                if (user.techno.indexOf(techno) != -1 && checkProfile(user.profile)) {
                    user.availabilities.forEach(availabily => {
                        if (availabily.available && availabily.date == new Date(date)) {
                            isRecuitersQualify = true;
                        }
                    });
                }
            }
        });
        return isRecuitersQualify;

    });

    var checkProfile = (recruiterProfile) => {

        var ok = recruiterProfile.indexOf('expert') != -1 || recruiterProfile.length == 0 ? true : false;
        if (!ok) {
            var recruiterRange = recruiterProfile.match(/\d+/g).map(Number);
            if (recruiterRange.length >= 2) {
                var candidateProfile = profile.match(/\d+/g).map(Number)[0];
                if (candidateProfile >= recruiterRange[0] && candidateProfile <= recruiterRange[1]) {
                    ok = true;
                }
            } else if (recruiterProfile.indexOf(profile) != -1) {
                ok = true;
            }
        }
        return ok;

    }

}