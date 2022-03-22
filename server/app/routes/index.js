const express = require('express');
const router = express.Router();

require('./users')(router);
require('./tasks')(router);
require('./auth')(router);
require('./notifications')(router);

module.exports = router;
