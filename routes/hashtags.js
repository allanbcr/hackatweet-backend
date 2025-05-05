var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const Hashtag = require ('../models/hashtags')

router.get ('/', (req, res)=>{
    Hashtag.find().then(data => {
        res.json({ result: true, hashtags : data})
    })
})

router.post('./:hashtag', (req, res) => {
    if ()
})