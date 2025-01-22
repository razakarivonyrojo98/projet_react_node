const mysql = require('mysql2/promise');

// Configuration de la connexion MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system',
    port: 3308
});
db.getConnection((err, connection)  => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
        connection.release(); // Libérer la connexion après la vérification
    }
});

module.exports = db;
