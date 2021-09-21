const express = require('express');
const user = require('./user')
const mongodb = require('../config/db');

let router = express();

mongodb(() => {
  router.use('/user', user);
});

module.exports = router;