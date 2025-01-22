const db = require("../config/database");

// Obtenir tous les Jouissance
exports.getAllJouissance = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Jouissance');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter un Jouissance
exports.addJouissance = async (req, res) => {
  const {
    Immatricule, Lieu, Motif, date_debut, date_fin, jour_demande, solde
  } = req.body;
 // Générer automatiquement la date de création
  const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format 'YYYY-MM-DD HH:MM:SS'


  const query = `
    INSERT INTO Jouissance 
    (Immatricule, Lieu, Motif, date_debut, date_fin, jour_demande, solde, date_creation) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    Immatricule, Lieu, Motif, date_debut, date_fin, jour_demande, solde, date_creation
  ];

  try {
    const [result] = await db.query(query, values);
    res.status(201).json({
      message: "Jouissance créé avec succès !",
      contratId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un Jouissance par ID avec async/await
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Jouissance WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Jouissance non trouvé" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un Jouissance
exports.updateJouissance = async (req, res) => {
  const id = req.params.id;
  const {
    Immatricule, Lieu, Motif, date_debut, date_fin, jour_demande, solde, date_creation
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Jouissance SET 
      Immatricule = ?, Lieu = ?, Motif = ?, date_debut = ?, date_fin = ?, jour_demande = ?, solde = ?, 
      date_creation = ?
      WHERE id = ?`,
      [
       Immatricule, Lieu, Motif, date_debut, date_fin, jour_demande, solde, date_creation,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jouissance non trouvé" });
    }
    res.json({ message: "Jouissance mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un Jouissance
exports.deleteJouissance = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM Jouissance WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jouissance non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
