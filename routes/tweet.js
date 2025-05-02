var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");

router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    res.json({ allTweet: data });
  });
});

router.post("/addTweet", (req, res) => {
  Tweet.find({ message: req.body.message }).then((data) => {
    const newTweet = new Tweet({
      message: req.body.message,
    });
    newTweet.save().then((message) => {
      res.json({ result: true, message: "tweet valid" });
    });
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
