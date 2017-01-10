const express = require('express');
const router = express.Router();
var request = require('request');

router.route('/finished')
  .post(function(req, res) {
    var html = '<div>' + req.body.text + '</div>';
    console.log(html)
  	res.json({
      body: html,
      raw: true
    })
  })

module.exports = router;