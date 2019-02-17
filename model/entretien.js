var mongoose = require('mongoose');

var entretienSchema = new mongoose.Schema({
    date: Date,
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    usePushEach: true
});

module.exports = mongoose.model('Entretien', entretienSchema);