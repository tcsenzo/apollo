let controllers = require('./controllers'),
		helpers = require('./helpers');

class Router {
	constructor(app) {
		app.get('/', helpers.auth.authorize, helpers.theatersByUser.getTheaters, (req, res) => controllers.indexController.index(req, res));

		app.get('/cadastro', (req, res) => controllers.signUpController.index(req, res));
		app.post('/cadastro', (req, res) => controllers.signUpController.create(req, res));

		app.get('/login', (req, res) => controllers.loginController.index(req, res));
		app.post('/login', (req, res) => controllers.loginController.login(req, res));
		app.post('/logout', (req, res) => controllers.loginController.logout(req, res));

		app.get('/teatros/novo', helpers.auth.authorize, (req, res) => controllers.theaterController.new(req, res));
		app.post('/teatros/novo', helpers.auth.authorize, (req, res) => controllers.theaterController.create(req, res));

		app.get('/teatros/:theaterId(\\d+)/eventos', helpers.auth.authorize, helpers.theatersByUser.getTheaters.bind(helpers.theatersByUser), (req, res) => controllers.eventsController.index(req, res));

		app.get('/teatros/:theaterId(\\d+)/eventos/novo', helpers.auth.authorize, helpers.theatersByUser.getTheaters, (req, res) => controllers.eventsController.new(req, res));
		app.post('/teatros/:theaterId(\\d+)/eventos/novo', helpers.auth.authorize, helpers.theatersByUser.getTheaters, (req, res) => controllers.eventsController.create(req, res));
	}
}

module.exports = Router;