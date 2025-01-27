import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { differenceInDays } from 'date-fns'; 

const Jouissance = () => {
  const initialRow = {
        id: "",Immatricule: "",Lieu: "",Motif: "",
        date_debut: "", date_fin: "", jour_demande: "",solde: "",date_creation: "",validate :""

    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nouvel état pour identifier l'édition
    const [editIndex, setEditIndex] = useState(null); // L'index de la ligne en cours d'édition
    const [searchTerm, setSearchTerm] = useState("");

    const fetchContratList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/jouissance');
            console.log('Données reçues :', response.data);
            setContratList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des jouissance :', error);
        }
    };

    useEffect(() => {
        fetchContratList();
    }, []);

const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    if (field === 'date_debut' || field === 'date_fin') {
        const { date_debut, date_fin } = newRows[index];
        if (date_debut && date_fin) {
            // Calculez la différence en jours
            const diff = differenceInDays(new Date(date_fin), new Date(date_debut));
            newRows[index].jour_demande = diff >= 0 ? diff : 0; // Évitez les valeurs négatives
        }
    }

    setRows(newRows);
};

    const handleEdit = (contrat, index) => {
        setRows([contrat]); // Remplit le formulaire avec les données sélectionnées
        setIsEditing(true);
        setEditIndex(index);
    };

const handleSubmit = async () => {
    const today = format(new Date(), 'yyyy-MM-dd'); // Formate la date actuelle au format YYYY-MM-DD
    const dataToSend = { 
        ...rows[0], 
        validate: isEditing ? rows[0].validate : "non", // Initialiser validate à "non" pour un ajout
        date_creation: isEditing ? rows[0].date_creation : today // Définir la date actuelle pour un nouvel ajout
    };

    try {
        if (isEditing) {
            await axios.put(`http://localhost:3000/jouissance/${dataToSend.id}`, dataToSend);
            alert('Jouissance modifié avec succès !');
            setIsEditing(false);
        } else {
            await axios.post('http://localhost:3000/jouissance', dataToSend);
            alert('Jouissance ajouté avec succès !');
        }
        fetchContratList();
        setRows([initialRow]);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
    }
};




    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/jouissance/${id}`);
            setContratList(ContratList.filter(item => item.id !== id)); // Supprimez localement
            alert('jouissance supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du jouissance :', error);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        try {
            return format(parseISO(date), 'dd/MM/yyyy');
        } catch {
            return date; // Retourne la date brute si elle n'est pas analysable
        }
    };

    const filteredContrats = ContratList.filter(contrat =>
        contrat.Immatricule.toString().includes(searchTerm)
    );

 const handleValidation = async (id) => {
    try {
        // Trouver le contrat à mettre à jour localement
        const contratToUpdate = ContratList.find((contrat) => contrat.id === id);

        if (!contratToUpdate) {
            alert("Contrat introuvable !");
            return;
        }

        // Mettre à jour la valeur de validate à "oui"
        const updatedContrat = { ...contratToUpdate, validate: "oui" };

        // Appel API pour mettre à jour côté serveur
        await axios.put(`http://localhost:3000/jouissance/${id}`, updatedContrat);

        // Mise à jour locale pour refléter les changements immédiatement
        setContratList((prevList) =>
            prevList.map((contrat) =>
                contrat.id === id ? { ...contrat, validate: "oui" } : contrat
            )
        );

        alert("Validation effectuée avec succès !");
    } catch (error) {
        console.error("Erreur lors de la validation :", error);
        alert("Erreur lors de la validation !");
    }
};



    return (
        <>
            <motion.div className="main-content-btf">
                <h1>{isEditing ? "Modifier la formulaire de Jouissance" : "Ajouter la formulaire de jouissance"}</h1>
                <div className="form-wrapper">
                    <motion.table border="1" className="btf-form-table">
                        {/* Formulaire */}
                        <tbody>
                            <tr>
                                <td><label >IM</label>
                                  <input type="text" value={rows[0].Immatricule} onChange={(e) => handleChange(0, 'Immatricule', e.target.value)} placeholder="IM" /></td>
                                <td><label >Lieu</label>
                                  <input type="text" value={rows[0].Lieu} onChange={(e) => handleChange(0, 'Lieu', e.target.value)} placeholder="Lieu" /></td>
                                <td><label >Motif</label>
                                  <input type="text" value={rows[0].Motif} onChange={(e) => handleChange(0, 'Motif', e.target.value)} placeholder="Motif" /></td>
                                <td><label >Date de debut</label>
                                  <input type="date" value={rows[0].date_debut} onChange={(e) => handleChange(0, 'date_debut', e.target.value)} placeholder="date_debut" /></td>
                                <td><label >Date de fin</label>
                                  <input type="date" value={rows[0].date_fin} onChange={(e) => handleChange(0, 'date_fin', e.target.value)} placeholder="date_fin" /></td>
                                <td><label >Jour de demande</label>
                                  <input type="number" value={rows[0].jour_demande} onChange={(e) => handleChange(0, 'jour_demande', e.target.value)} placeholder="jour_demande" /></td>
                            </tr>
                            <tr>
                                
                               
                            </tr>
                        </tbody>
                    </motion.table>
                    <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                </div>

                {/* Liste des contrats */}
                <div className="table-wrapper">
                    <h2>Liste des demandes de Jouissance</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Rechercher par IM"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Immatricule</th>
                                <th>Lieu</th>
                                <th>Motif</th>
                                <th>Date du debut</th>
                                <th>Date fin</th>
                                <th>Duré </th>
                                <th>Date de creation</th>
                                <th>Validation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContrats.length > 0 ? (
                                filteredContrats.map((contrat, index) => (
                                <tr key={index}>
                                    <td>{contrat.id}</td>
                                    <td>{contrat.Immatricule}</td>
                                    <td>{contrat.Lieu}</td>
                                    <td>{contrat.Motif}</td>

                                    <td>{formatDate(contrat.date_debut)}</td>
                                    <td>{formatDate(contrat.date_fin)}</td>
                                    <td>{contrat.jour_demande}</td>
                                   
                                    <td>{formatDate(contrat.date_creation)}</td>
                                    <td>{contrat.validate === "oui" ? "oui" : "non"}</td>

                                    <td>
                                        <GrValidate
                                            onClick={() => handleValidation(contrat.id)}
                                            style={{ cursor: "pointer", color: "green" }}
                                        />
                                        <MdEdit onClick={() => handleEdit(contrat, index)} style={{ cursor: 'pointer', color: 'blue' }} />
                                        <MdDelete onClick={() => handleDelete(contrat.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                    </td>
                                </tr>
                            ))
                         ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Aucun résultat trouvé</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </>
    );
};

export default Jouissance