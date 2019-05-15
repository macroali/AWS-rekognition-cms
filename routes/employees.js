var express = require('express');
var router = express.Router();
var employees = require('../controllers/employeesController.js');

/* GET employees list. */
router.get('/list', employees.list);
// GET employees form
router.get('/edit/:id', employees.edit);

module.exports = router;
