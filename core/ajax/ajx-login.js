const fs = require('fs');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const config = JSON.parse(fs.readFileSync('./bin/config.json'));
const UserPoolId = config.cognito.userPoolId;
const ClientId = config.cognito.clientId;
const userPool = new AmazonCognitoIdentity.CognitoUserPool({ UserPoolId, ClientId })
const WindowMock = require('window-mock').default;
global.window = {
    localStorage: new WindowMock().localStorage
};
global.navigator = () => null;

var ajxLogin = {};

ajxLogin.createSession = function(req, res) {
    const loginDetails = {
        Username: req.body.username_email,
        Password: req.body.pass
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);

    const userDetails = {
        Username: req.body.username_email,
        Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: data => {
            req.session.sub = data.idToken.payload.sub;
            console.log(req.session.sub);
            res.send({ status: 'OK', message: 'Completed Process' });
        },
        onFailure: err => {
            console.error(err);
            res.send({ status: 'Error', message: err.message });
        }
    });
}

module.exports = ajxLogin;
