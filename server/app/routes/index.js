const express = require('express');
const router = express.Router();

require('./users')(router);
require('./tasks')(router);
require('./auth')(router);

module.exports = router;
