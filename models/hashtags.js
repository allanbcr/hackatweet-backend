const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  hashtag: String,
  writer: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets'}]
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;