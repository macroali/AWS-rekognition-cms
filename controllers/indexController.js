const fs = require('fs');
const parameters = JSON.parse(fs.readFileSync('./bin/parameters.json'));

var indexController = {};


indexController.home = function(req, res) {
    if (!req.session.sub) {
        return res.redirect('/denied');
    }
    
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
    var alert = '';
    if (req.route.path == '/denied') {
        alert = 'Acceso restringido. Debes iniciar sesión'
    }

    res.render('home/login', {
        base: parameters.base_url, title: 'login',
        alertMessage: alert
    });
};


/*
 * Other actions
 */

module.exports = indexController;
