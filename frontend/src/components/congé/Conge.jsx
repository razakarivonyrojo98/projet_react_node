import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { CiSaveDown2 } from "react-icons/ci";

const Contrat2 = () => {
    const initialRow = {
        id: "",Immatricule: "",name: "",firstName: "",
        corps: "",services: "",ciscolaire: "",duration: "",index: "",
    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nouvel état pour identifier l'édition
    const [editIndex, setEditIndex] = useState(null); // L'index de la ligne en cours d'édition
    const [searchTerm, setSearchTerm] = useState("");

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
                alert('Congé modifié avec succès !');
                setIsEditing(false); // Réinitialisez l'état
            } else {
                // Appel POST pour un nouvel ajout
                await axios.post('http://localhost:3000/api_contrat2', dataToSend);
                alert('Congé ajouté avec succès !');
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
            alert('Congé supprimé avec succès !');
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

    const filteredContrats = ContratList.filter(contrat =>
        contrat.Immatricule.toString().includes(searchTerm)
    );

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
                            </tr>
                            <tr>
                                <td><label >Service</label>
                                    <input type="text" value={rows[0].services} onChange={(e) => handleChange(0, 'services', e.target.value)} placeholder="Service" /></td>
                                <td><label >CISCO</label>
                                    <select type="text" value={rows[0].ciscolaire} onChange={(e) => handleChange(0, 'ciscolaire', e.target.value)} placeholder="CISCO" >
                                        <option></option>
                                        <option value="Ambalavao">Ambalavao</option>
                                        <option value="Ambohimahasoa">Ambohimahasoa</option>
                                        <option value="Fianarantsoa">Fianarantsoa</option>
                                        <option value="Lalangina">Lalangina</option>
                                        <option value="Ikalamavony">Ikalamavony</option>
                                        <option value="Isandra">Isandra</option>
                                        <option value="Vohibato">Vohibato</option>
                                    </select></td>
                                
                                <td><label >Duré</label>
                                    <input type="number" value={rows[0].duration} onChange={(e) => handleChange(0, 'duration', e.target.value)} placeholder="Durée" /></td>
                            </tr>
                        </tbody>
                    </motion.table>
                    <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                </div>

                {/* Liste des contrats */}
                <div className="table-wrapper">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Rechercher par IM"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <h2>Liste des demandes de congé</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Immatricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Corps</th>
                                <th>Service</th>
                                <th>CISCO</th>
                                <th>Duree</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContrats.length > 0 ? (
                                filteredContrats.map((contrat, index) => (
                                <tr key={index}>
                                    <td>{contrat.id}</td>
                                    <td>{contrat.Immatricule}</td>
                                    <td>{contrat.name}</td>
                                    <td>{contrat.firstName}</td>
                                    <td>{contrat.corps}</td>
                                    <td>{contrat.services}</td>
                                    <td>{contrat.ciscolaire}</td>
                                    <td>{contrat.duration}</td>
                                    <td>
                                        <MdEdit onClick={() => handleEdit(contrat, index)} style={{ cursor: 'pointer', color: 'blue' }} />
                                        <MdDelete onClick={() => handleDelete(contrat.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                        <PDFDownloadLink
                                            document={<PDFDocument contrat={contrat} />}
                                            fileName={`Demande_Conge_${contrat.Immatricule}.pdf`}
                                        >
                                            {({ loading }) =>
                                                loading ? "Chargement..." : <CiSaveDown2 />
                                            }
                                        </PDFDownloadLink>
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

export default Contrat2;
