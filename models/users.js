const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: String,
    username: String,
    password: String,
    token: String,
    likes: Number,
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref:'users' }]
});

const User = mongoose.model('user', userSchema)

module.exports = User