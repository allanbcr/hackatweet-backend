var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const Hashtag = require("../models/hashtags");

router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    res.json({ allTweet: data });
  });
});

router.post("/addTweet/:token", (req, res) => {
  // Change the token to _id
  User.findOne({ token: req.params.token }).then((data) => {
    console.log(data);
    if (data) {
      const newTweet = new Tweet({
        // tweet_id: req.body.token,
        username: req.body.username, // pas besoin car populate de writer possible
        firstname: req.body.firstname, // pas besoin car populate de writer possible
        message: req.body.message,
        date: new Date(),
        writer: data._id,
      });
      newTweet.save().then((data2) => {
        // Grace a dieu, tu vas pouvoir récuperer les hashtags présents dans ton message
        // const hashtags = req.body.message.split('#');
        // console.log(hashtags);

        const hashtags = req.body.message.match(/#[a-z0-9]+/gi);

        if (hashtags) {
          for (let i = 0; i < hashtags.length; i++) {
            console.log("hash =>", i, hashtags[i]);
            Hashtag.findOneAndUpdate(
              {
                hashtag: hashtags[i],
              },
              {
                $push: { tweets: data2._id },
              },
              { upsert: true }
            ).exec();
          }
        }

        // Change the token to _id
        // User.updateOne(
        //   { _id: req.params.token },
        //   { $push: { tweets: data2._id } }
        // ).then(() => res.json({ result: true, message: "tweet saved",  }));

        // const newMessageTo =

        res.json({ result: true });
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
