const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Assurez-vous que le chemin est correct

exports.registre = async (req, res) => {
    const { username, email, password } = req.body;

    // Vérification si le mot de passe est vide ou non défini
    if (!password) {
        return res.status(400).json({ error: "Le mot de passe est requis." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.user = async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, username, email,password, created_at FROM users');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};
