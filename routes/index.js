var express = require('express');
var router = express.Router();
var index = require('../controllers/indexController.js');
var ajxLogin = require('../core/ajax/ajx-login');

/* GET home page. */
router.get('/', index.home);

/* GET login page. */
router.get('/login', index.login);
router.post('/ajx/login', ajxLogin.createSession);

module.exports = router;
