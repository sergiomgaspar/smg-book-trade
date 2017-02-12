'use strict';

var express = require('express');
var controller = require('./book-search.controller');

var router = express.Router();

router.get('/:id', controller.show);

module.exports = router;
