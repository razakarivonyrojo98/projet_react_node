const db = require("../config/database");

// Obtenir tous les Decision
exports.getAllDecision = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Decision');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter un Decision
exports.addMonDecision = async (req, res) => {
  const {
    IM,date_validation, statut, date_expiration
  } = req.body;

  const query = `
    INSERT INTO Decision 
    (IM,date_validation, statut, date_expiration) 
    VALUES (?, ?, ?, ?)
  `;

  const values = [
   IM, date_validation, statut, date_expiration
  ];

  try {
    const [result] = await db.query(query, values);
    res.status(201).json({
      message: "Decision créé avec succès !",
      contratId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un Decision par ID avec async/await
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Decision WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Decision non trouvé" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un Decision
exports.updateMonDecision = async (req, res) => {
  const id = req.params.id;
  const {
    IM,date_validation, statut, date_expiration
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Decision SET 
      IM = ?,date_validation = ?, statut = ?, date_expiration = ?
      WHERE id = ?`,
      [
        IM, date_validation, statut, date_expiration, id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Decision non trouvé" });
    }
    res.json({ message: "Decision mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un Decision
exports.deleteMonDecision = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM Decision WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Decision non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
