import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";

const Decision = () => {
 const initialRow = {
        id: "",IM: "",date_validation: "",statut: "",date_expiration: "",

    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nouvel état pour identifier l'édition
    const [editIndex, setEditIndex] = useState(null); // L'index de la ligne en cours d'édition

    const fetchContratList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/decision');
            console.log('Données reçues :', response.data);
            setContratList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des decision :', error);
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
                await axios.put(`http://localhost:3000/decision/${dataToSend.id}`, dataToSend);
                alert('decision modifié avec succès !');
                setIsEditing(false); // Réinitialisez l'état
            } else {
                // Appel POST pour un nouvel ajout
                await axios.post('http://localhost:3000/decision', dataToSend);
                alert('decision ajouté avec succès !');
            }
            fetchContratList();
            setRows([initialRow]); // Réinitialisez le formulaire
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/decision/${id}`);
            setContratList(ContratList.filter(item => item.id !== id)); // Supprimez localement
            alert('decision supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du decision :', error);
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
                                  <input type="number" value={rows[0].IM} onChange={(e) => handleChange(0, 'IM', e.target.value)} /></td>
                                <td><label >Date de validation</label>
                                  <input type="date" value={rows[0].date_validation} onChange={(e) => handleChange(0, 'date_validation', e.target.value)} /></td>
                                <td><label >Satut</label>
                                  <input type="text" value={rows[0].statut} onChange={(e) => handleChange(0, 'statut', e.target.value)} placeholder="Statut" /></td>
                                <td><label >Date d'expiration</label>
                                  <input type="date" value={rows[0].date_expiration} onChange={(e) => handleChange(0, 'date_expiration', e.target.value)} /></td>                           
                            </tr>
                        </tbody>
                    </motion.table>
                    <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                </div>

                {/* Liste des contrats */}
                <div className="table-wrapper">
                    <h2>Liste des demandes de decision</h2>
                    <table>
                        <thead>
                            <tr>

                                <th>ID</th>
                                <th>IM</th>
                                <th>Date de validation</th>
                                <th>Statut</th>
                                <th>Date d'expiration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ContratList.map((contrat, index) => (
                                <tr key={index}>
                                    <td>{contrat.id}</td>
                                    <td>{contrat.IM}</td>
                                    <td>{formatDate(contrat.date_validation)}</td>
                                    <td>{contrat.statut}</td>
                                    <td>{formatDate(contrat.date_expiration)}</td>
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

export default Decision