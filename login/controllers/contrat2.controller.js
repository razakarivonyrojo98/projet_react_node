const db = require("../config/database");

// Obtenir tous les contrats
exports.getAllMonContrat2 = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM deuxiemecontrat');
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter un contrat
exports.addMonContrat2 = async (req, res) => {
  const {
    Immatricule, name, firstName, corps, assimilation, diplomer, services, ciscolaire, date_services, date_effet, duration, index,
  } = req.body;



  const query = `
    INSERT INTO deuxiemecontrat 
    (Immatricule, name, firstName, corps, assimilation, diplomer, services, ciscolaire, date_services, date_effet, duration, \`index\`) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    Immatricule, name, firstName, corps, assimilation, diplomer, services, ciscolaire, date_services, date_effet, duration, index,
  ];

  try {
    const [result] = await db.query(query, values);
    res.status(201).json({
      message: "Contrat créé avec succès !",
      contratId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un contrat par ID avec async/await
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM DeuxiemeContrat WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Contrat non trouvé" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un contrat
exports.updateMonContrat2 = async (req, res) => {
  const id = req.params.id;
  const {
    Immatricule,name,firstName,corps, assimilation,diplomer, services,ciscolaire,date_services,date_effet,duration,index,
  } = req.body;


  try {
    const [result] = await db.query(
      `UPDATE DeuxiemeContrat SET 
      Immatricule = ?, name = ?, firstName = ?, corps = ?, assimilation = ?, diplomer = ?, services = ?, 
      ciscolaire = ?, date_services = ?, date_effet = ?, duration = ?, \`index\` = ?
      WHERE id = ?`,
      [
        Immatricule, name, firstName, corps, assimilation, diplomer, services, ciscolaire, date_services, date_effet, duration,
        index, id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contrat non trouvé" });
    }
    res.json({ message: "Contrat mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un contrat
exports.deleteMonContrat2 = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM DeuxiemeContrat WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contrat non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
