const express = require ('express');
const router = express.Router();
const mysqlConnexion = require('../../sql/connection');

router.get('/', (req, res, next) => {
	mysqlConnexion.query('SELECT * FROM admin.agent ORDER BY agent;', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:idAgent', (req, res, next) => {
	const idAgent = req.params.idAgent;
	mysqlConnexion.query('SELECT * FROM admin.agent WHERE id_agent = '+idAgent+';', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.post('/team', (req, res, next) => {
	const idAgent = req.params.idAgent;
	mysqlConnexion.query('UPDATE admin.agent SET team WHERE id_agent = '+idAgent+';', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});


module.exports = router;