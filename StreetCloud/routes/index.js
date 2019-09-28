var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /**
   * External Citation
   * Problem: Didn't know how to set home page as default
   * Date: September 25, 2019
   * Resource: https://stackoverflow.com/questions/21119288/simplest-way-to-have-express-serve-a-default-page
   * Resolution: Used sendFile solution found on this forum
   */
  res.sendFile('streetcloud.html', { root: __dirname + "/../public"});
});

module.exports = router;
