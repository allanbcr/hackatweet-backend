const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: String,
    username: String,
    password: String,
    token: String,
    likes: Number,
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }]
});

const User = mongoose.model("users", userSchema);

module.exports = User;
