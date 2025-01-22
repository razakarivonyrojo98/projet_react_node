import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";

const Contrat2 = () => {
    const initialRow = {
        id: "",Immatricule: "",name: "",firstName: "",
        corps: "", assimilation: "", diplomer: "",services: "",ciscolaire: "",
        date_services: "",date_effet: "",duration: "",index: "",
    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nouvel état pour identifier l'édition
    const [editIndex, setEditIndex] = useState(null); // L'index de la ligne en cours d'édition

    const fetchContratList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api_contrat2');
            console.log('Données reçues :', response.data);
            setContratList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des contrats :', error);
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
                await axios.put(`http://localhost:3000/api_contrat2/${dataToSend.id}`, dataToSend);
                alert('Contrat modifié avec succès !');
                setIsEditing(false); // Réinitialisez l'état
            } else {
                // Appel POST pour un nouvel ajout
                await axios.post('http://localhost:3000/api_contrat2', dataToSend);
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
            await axios.delete(`http://localhost:3000/api_contrat2/${id}`);
            setContratList(ContratList.filter(item => item.id !== id)); // Supprimez localement
            alert('Contrat supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du contrat :', error);
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
                                <td><label >Nom</label>
                                    <input type="text" value={rows[0].name} onChange={(e) => handleChange(0, 'name', e.target.value)} placeholder="Nom" /></td>
                                <td><label >Prenom</label>
                                    <input type="text" value={rows[0].firstName} onChange={(e) => handleChange(0, 'firstName', e.target.value)} placeholder="Prénom" /></td>
                                <td><label >Corps</label>
                                    <input type="text" value={rows[0].corps} onChange={(e) => handleChange(0, 'corps', e.target.value)} placeholder="Corps" /></td>
                                <td><label >Assimulation</label>
                                    <input type="text" value={rows[0].assimilation} onChange={(e) => handleChange(0, 'assimilation', e.target.value)} placeholder="Assimilation" /></td>
                                <td><label >Diplome</label>
                                    <input type="text" value={rows[0].diplomer} onChange={(e) => handleChange(0, 'diplomer', e.target.value)} placeholder="Diplôme" /></td>
                            </tr>
                            <tr>
                                <td><label >Service</label>
                                    <input type="text" value={rows[0].services} onChange={(e) => handleChange(0, 'services', e.target.value)} placeholder="Service" /></td>
                                <td><label >CISCO</label>
                                    <input type="text" value={rows[0].ciscolaire} onChange={(e) => handleChange(0, 'ciscolaire', e.target.value)} placeholder="CISCO" /></td>
                                <td><label >Date de service</label>
                                    <input type="date" value={rows[0].date_services} onChange={(e) => handleChange(0, 'date_services', e.target.value)} /></td>
                                <td><label >Date d'effet</label>
                                    <input type="date" value={rows[0].date_effet} onChange={(e) => handleChange(0, 'date_effet', e.target.value)} /></td>
                                <td><label >Duré</label>
                                    <input type="number" value={rows[0].duration} onChange={(e) => handleChange(0, 'duration', e.target.value)} placeholder="Durée" /></td>
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
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Corps</th>
                                <th>Assimilation</th>
                                <th>Date Service</th>
                                <th>Date Effet</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ContratList.map((contrat, index) => (
                                <tr key={index}>
                                    <td>{contrat.id}</td>
                                    <td>{contrat.Immatricule}</td>
                                    <td>{contrat.name}</td>
                                    <td>{contrat.firstName}</td>
                                    <td>{contrat.corps}</td>
                                    <td>{contrat.assimilation}</td>
                                    <td>{formatDate(contrat.date_services)}</td>
                                    <td>{formatDate(contrat.date_effet)}</td>
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

export default Contrat2;
