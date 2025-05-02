var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");

router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    res.json({ allTweet: data });
  });
});

router.post("/addTweet/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      const newTweet = new Tweet({
        message: req.body.message,
        writer: data._id,
      });
      newTweet.save().then((data) => {
        res.json({ result: true, message: "tweet saved" });
      });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.delete("/:_id", (req, res) => {
  Tweet.findByIdAndDelete(req.params._id).then((deleteTweet) => {
    Tweet.find().then((data) => {
      res.json({ result: true, allTweet: data });
    });
  });
});

module.exports = router;
