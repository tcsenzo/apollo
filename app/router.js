let controllers = require('./controllers'),
		helpers = require('./helpers');

class Router {
	constructor(app) {
		app.get('/', (req, res) => controllers.indexController.index(req, res));

		app.get('/cadastro', (req, res) => controllers.signUpController.index(req, res));
		app.post('/cadastro', (req, res) => controllers.signUpController.create(req, res));

		app.get('/login', (req, res) => controllers.loginController.index(req, res));
		app.post('/login', (req, res) => controllers.loginController.login(req, res));

		app.post('/teatros/novo', (req, res) => controllers.signUpController.create(req, res));
	}
}

module.exports = Router;
