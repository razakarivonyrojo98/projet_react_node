const express = require('express');
const mysql = require('mysql2');


const bodyParser = require('body-parser');
const cors = require('cors');

const tstRoute = require("./routes/auth.routes");
const contrat2 = require("./routes/contrat2.routes");

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api_auth', (req, res, next) => {
    req.db = db; // Ajouter `db` à la requête
    next();
}, tstRoute);
app.use('/api_contrat2', contrat2);

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system',
    port: 3308
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

app.listen(port, () => {
    console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`);
});


module.exports = db; 
