const db = require("../config/database");

// Obtenir tous les contrats
exports.getAllStatDecision = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Decision');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir tous les Jouissance
exports.getAllStatJouissance = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Jouissance');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir tous les contrats
exports.getAllStatConge = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM deuxiemecontrat');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

