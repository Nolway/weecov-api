const express = require ('express');
const router = express.Router();
const mysqlConnexion = require('../../sql/connection');

router.get('/', (req, res, next) => {
	mysqlConnexion.query('SELECT * FROM admin.team ORDER BY id_team;', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});

router.get('/:idTeam', (req, res, next) => {
	const idTeam = req.params.idTeam;
	mysqlConnexion.query('SELECT * FROM admin.team WHERE id_team = '+idTeam+';', (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({err});
		}
		res.status(200).json(data);
	});
});


module.exports = router;