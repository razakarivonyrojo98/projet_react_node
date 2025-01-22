const express = require('express');



const bodyParser = require('body-parser');
const cors = require('cors');

const tstRoute = require("./routes/auth.routes");
const contrat2 = require("./routes/contrat2.routes");
const decision = require("./routes/decision.routes");
const jouissance = require("./routes/jouissance.routes");
const stat = require("./routes/stat.routes");

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
app.use('/decision', decision);
app.use('/jouissance', jouissance);
app.use('/stat', stat);




app.listen(port, () => {
    console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`);
});



