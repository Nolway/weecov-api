const mysql = require('mysql');

const configMysql = require('./conf');

const connexion = mysql.createConnection({
	host: configMysql.host,
	user: configMysql.user,
	password: configMysql.password
});

connexion.connect();


module.exports = connexion;