`use strict`;
let Router = require(`./router`),
		express = require(`express`),
		http = require(`http`),
		i18n = require(`i18n`),
		_ = require(`underscore`),
		morgan = require(`morgan`),
		bodyParser = require(`body-parser`),
		session = require(`express-session`),
		cookieParser = require(`cookie-parser`),
		cookie = require('cookie'),
		busboy = require('connect-busboy'),
		config = require('./config.js');

class App {
	constructor() {
		let	app = express(),
    		server = http.Server(app);

		this.i18nConfig();
		this.appConfig(app);
		new Router(app);

		this.startServer(server);
	}

	i18nConfig() {
		i18n.configure({
		  locales:[`en`],
		  directory: `app/locales`,
			objectNotation: true,
			updateFiles: false,
			api: {
				'__': 't'
			}
		});
	}

	appConfig(app) {
		app.use(morgan(`dev`));
		app.set(`view engine`, `jade`);
    app.set(`views`, `app/views`);
    app.use(i18n.init);
		app.use(`/assets`, express.static(`app/assets/dist`));
		app.use(cookieParser());
		app.locals.basedir = 'app/views';
		app.locals.helpers = require(`./helpers`);

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
		  extended: true
		}));

		app.use(busboy());

		app.use(session({
			secret: 'qettal',
			resave: false,
  		saveUninitialized: true
		}));

		app.use(function(req, res, next ) {
	    var _render = res.render;
	    res.render = function(view, options, fn) {
				let reqCookie = cookie.parse(req.headers.cookie || ''),
						globals = {
							viewName: view.split('/')[0],
							session: req.session,
							loggedUser: (reqCookie.qettal2LoggedUser ? true : false),
							config: config,
							cookies: reqCookie,
							req: req
						};

				options = options || {};
        options = _.extend(options, globals);

        _render.call( this, view, options, fn );
	    }
	    next();
		});
	}

	startServer(server) {
		let port = 4001,
				serverName = `0.0.0.0`;

		server.listen(port, serverName, () => console.log(`Listening on ${serverName}:${port}`));
	}
}

new App();
