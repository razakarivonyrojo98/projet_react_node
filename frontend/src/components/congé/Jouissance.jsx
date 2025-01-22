import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";

const Jouissance = () => {
  const initialRow = {
        id: "",Immatricule: "",Lieu: "",Motif: "",
        date_debut: "", date_fin: "", jour_demande: "",solde: "",date_creation: "",

    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nouvel état pour identifier l'édition
    const [editIndex, setEditIndex] = useState(null); // L'index de la ligne en cours d'édition

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
        setRows(newRows);
    };

    const handleEdit = (contrat, index) => {
        setRows([contrat]); // Remplit le formulaire avec les données sélectionnées
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleSubmit = async () => {
        const dataToSend = rows[0]; // Prenez la première (et unique) ligne de `rows`

        try {
            if (isEditing) {
                // Appel PUT pour la mise à jour
                await axios.put(`http://localhost:3000/jouissance/${dataToSend.id}`, dataToSend);
                alert('Contrat modifié avec succès !');
                setIsEditing(false); // Réinitialisez l'état
            } else {
                // Appel POST pour un nouvel ajout
                await axios.post('http://localhost:3000/jouissance', dataToSend);
                alert('Contrat ajouté avec succès !');
            }
            fetchContratList();
            setRows([initialRow]); // Réinitialisez le formulaire
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

    return (
        <>
            <motion.div className="main-content-btf">
                <h1>{isEditing ? "Modifier un conge" : "Ajouter un congé"}</h1>
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
                                <td><label >Solde</label>
                                  <input type="number" value={rows[0].solde} onChange={(e) => handleChange(0, 'solde', e.target.value)} placeholder="solde" /></td>
                                <td><label >Date de creation</label>
                                  <input type="date" value={rows[0].date_creation} onChange={(e) => handleChange(0, 'date_creation', e.target.value)} placeholder="date_creation" /></td>
                               
                            </tr>
                        </tbody>
                    </motion.table>
                    <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                </div>

                {/* Liste des contrats */}
                <div className="table-wrapper">
                    <h2>Liste des demandes de congé</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Immatricule</th>
                                <th>Lieu</th>
                                <th>Motif</th>
                                <th>Date du debut</th>
                                <th>Date fin</th>
                                <th>Duré</th>
                                <th>Solde</th>
                                <th>Date de creation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ContratList.map((contrat, index) => (
                                <tr key={index}>
                                    <td>{contrat.id}</td>
                                    <td>{contrat.Immatricule}</td>
                                    <td>{contrat.Lieu}</td>
                                    <td>{contrat.Motif}</td>

                                    <td>{formatDate(contrat.date_debut)}</td>
                                    <td>{formatDate(contrat.date_fin)}</td>
                                    <td>{contrat.jour_demande}</td>
                                    <td>{contrat.solde}</td>
                                    <td>{formatDate(contrat.date_creation)}</td>
                                    <td>
                                        <MdEdit onClick={() => handleEdit(contrat, index)} style={{ cursor: 'pointer', color: 'blue' }} />
                                        <MdDelete onClick={() => handleDelete(contrat.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </>
    );
};

export default Jouissance