const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  message: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
