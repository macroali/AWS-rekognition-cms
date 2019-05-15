const fs = require('fs');
const parameters = JSON.parse(fs.readFileSync('./bin/parameters.json'));
const config = JSON.parse(fs.readFileSync('./bin/config.json'));
const request = require('request');
const moment = require('moment');

var employeesController = {};

/**
 * Login Action
 * @param  {object} req Request
 * @param  {object} res Response
 * @return {view}
 */
employeesController.list = (req, res) => {

    request.get(config.paths.API + '/employees', (err, response, body) => {
        if (err) { return console.log('Erro: ' + err); }

        res.render('employees/list', {
            title: 'Listado de empleados',
            base: parameters.base_url,
            employees: JSON.parse(body).data
        });
    });
};

employeesController.edit = (req, res) => {
    var employee_id = req.params.id;

    request.get(config.paths.API + '/employee?id=' + employee_id, (err, response, body) => {
        if (err) { return console.log('Erro: ' + err); }
        var data = JSON.parse(body).data;

        data.male = (data.gender == "M") ? "checked" : "";
        data.female = (data.gender == "F") ? "checked" : "";
        data.formed_birthdate = moment(new Date(data.birthday), "YYYY-MM-DD").format("DD-MM-YYYY");
        
        res.render('employees/edit', {
            title: 'Editar empleado:',
            base: parameters.base_url,
            employee: data
        });
    });
}


module.exports = employeesController;
