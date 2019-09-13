var express = require('express');
var router = express.Router();
const controllers = require('../controllers');

router.get('/suggestions', controllers.fetchCities);

module.exports = router;