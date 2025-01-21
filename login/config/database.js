const mysql = require('mysql2/promise');

// Configuration de la connexion MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system',
    port: 3308
});

module.exports = db;
