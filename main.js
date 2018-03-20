const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('Démarrage de Weecov REST API sur le port : ' + port);
});

// Import des routes
const agentRoutes = require('./api/routes/agent');

// Log toutes les req
app.use(morgan('dev'));

// Permet d'analyser les données des req
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Autorisation d'utiliser l'API partout
app.use(cors());

// Utilisation des routes
app.use('/agent', 	agentRoutes);

//Gestion des erreurs, ce middleware s'active si aucune des routes ne correspond
app.use((req, res, next) => {
	const error = new Error("Non reconnu");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;