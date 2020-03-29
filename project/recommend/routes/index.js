var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Courses Recommendation based on Jobs',
    locations: ['Canada', 'United States'],
    query: "Search this blog",
    jobs: [],
    courses: []
  });
});

module.exports = router;
