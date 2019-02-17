var disponibiliteManager = require("../../services/planification-entretien/disponibiliteManager.js");

exports.run = (techno, profile, date) => { // promise partout ? attend pas les retours

    var result;
    if (disponibiliteManager.isRecruitersAvailable(date)) {
        if (disponibiliteManager.isRecruitersQualify(techno, profile, date)) {
            result = {
                code: 200,
                message : "Ok"
            }
        } else {
            result = {
                code: 404,
                message : "No recruiters qualify"
            }
        }
    } else {
        result = {
            code: 404,
            message : "No recruiters available"
        }
    }
    return result;

}