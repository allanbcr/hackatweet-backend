const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  message: String,
  date: Date,
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
