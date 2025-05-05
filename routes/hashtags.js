var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const Hashtag = require('../models/hashtags')

router.get('/', (req, res) => {
    Hashtag.find().then(data => {
        res.json({ result: true, hashtags: data })
    })
})

router.post('/', (req, res) => {
    Hashtag.findOne({ hashtag: req.body.hashtag }).then(data => {
        if (data === null) {
            const newHashtag = new Hashtag ({
                hashtag: req.body.hashtag,
                tweets: [req.body.tweetId]
            });
            newHashtag.save().then((data) => {

            })
        }
    }
})