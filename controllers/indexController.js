const fs = require('fs');
const parameters = JSON.parse(fs.readFileSync('./bin/parameters.json'));

var indexController = {};


indexController.home = function(req, res) {
    res.render('home/home', {
        base: parameters.base_url,
        title: 'Inicio'
    });
}

/**
 * Login Action
 * @param  {object} req Request
 * @param  {object} res Response
 * @return {view}
 */
indexController.login = function(req, res){
    res.render('home/login', {
        base: parameters.base_url, title: 'login'
    });
};


/*
 * Other actions
 */

module.exports = indexController;
