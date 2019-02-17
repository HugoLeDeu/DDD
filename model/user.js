var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    isCandidate: Boolean,
    techno: String,
    process: String,
    profile: String,
    comments: String,
    availabilities: [
        {
            date: Date,
            available: Boolean
        }
    ]
}, {
    usePushEach: true
});

module.exports = mongoose.model('User', userSchema);