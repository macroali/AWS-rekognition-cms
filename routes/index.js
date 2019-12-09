var express = require('express');
var router = express.Router();
var index = require('../controllers/indexController.js');
var ajxLogin = require('../core/ajax/ajx-login');

/* GET home page. */
router.get('/', index.home);
router.get('/dashboard', index.home);

/* GET login page. */
router.get('/login', index.login);
router.get('/denied', index.login);


// POST login service
router.post('/ajx/login', ajxLogin.createSession);

router.get('/test', (req, res) => {
    req.session.test = "prueba de sesión";
    req.session.save();
    console.log(req.session);
    res.send('class added');
});


module.exports = router;
