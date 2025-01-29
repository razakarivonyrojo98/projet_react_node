const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const db = require('../config/database'); 

// Création d'un compte fixe pour le responsable s'il n'existe pas
const createAdminAccount = async () => {
    const username = "DREN_HM";
    const email = "admin@example.com"; // Peut être changé selon votre besoin
    const password = "dren000";
    const role = "responsable";

    try {
        const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existing.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [username, email, hashedPassword, role]
            );
            console.log("Compte administrateur créé !");
        }
    } catch (err) {
        console.error("Erreur lors de la création du compte admin :", err.message);
    }
};

// Exécuter la création du compte admin au démarrage
createAdminAccount();

exports.registre = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Le mot de passe est requis." });
    }

    try {
        // Vérification si l'utilisateur est le responsable
        if (username === "DREN_HM") {
            return res.status(403).json({ error: "Ce nom d'utilisateur est réservé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, "employe"]
        );

        res.status(201).json({ message: 'Utilisateur employé créé avec succès' });
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

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.user = async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, username, email, role, password, created_at FROM users');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};
