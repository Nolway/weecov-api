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


router.post('/team', (req, res, next) => {
	const agent = {
		idAgent: req.body.idAgent,
		idTeam: req.body.idTeam
	};
	if (agent.idAgent != undefined && agent.idTeam != undefined) {
		mysqlConnexion.query('UPDATE admin.agent SET team = '+agent.idTeam+' WHERE id_agent = '+agent.idAgent+';', (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Utilisateur modifié",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Merci de renseigner des id corrects"
		});
	}
});

router.post('/num', (req, res, next) => {
	const agent = {
		idAgent: req.body.idAgent,
		num: req.body.num
	};
	if (agent.idAgent != undefined) {
		mysqlConnexion.query('UPDATE admin.agent SET num_hidden = '+agent.num+' WHERE id_agent = '+agent.idAgent+';', (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).json({err});
			}
			res.status(201).json({
				message: "Utilisateur modifié",
				data
			});
		});
	} else {
		res.status(500).json({
			message: "Merci de renseigner des id corrects"
		});
	}
});


module.exports = router;