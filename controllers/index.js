var express = require('express')
  , router = express.Router();

router.use('/stations', require('./stations'))

router.get('/', function(req, res) {
  /*Comments.all(function(err, comments) {
    res.render('index', {comments: comments})
  })*/
})

module.exports = router
