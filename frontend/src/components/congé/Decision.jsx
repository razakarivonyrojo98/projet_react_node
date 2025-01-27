import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { MdDelete, MdEdit } from "react-icons/md";

const Decision = () => {
    const initialRow = {
        id: "", IM: "", date_validation: "", statut: "", date_expiration: "",
    };

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
        setRows([contrat]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleSubmit = async () => {
        const dataToSend = rows[0];
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3000/decision/${dataToSend.id}`, dataToSend);
                alert('decision modifié avec succès !');
                setIsEditing(false);
            } else {
                await axios.post('http://localhost:3000/decision', dataToSend);
                alert('decision ajouté avec succès !');
            }
            fetchContratList();
            setRows([initialRow]);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/decision/${id}`);
            setContratList(ContratList.filter(item => item.id !== id));
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
            return date;
        }
    };

    const filteredContrats = ContratList.filter(contrat =>
        contrat.IM.toString().includes(searchTerm)
    );

    return (
        <>
            <motion.div className="main-content-btf">
                <h1>{isEditing ? "Modifier la formulaire de decision" : "Ajouter la formulaire de decision"}</h1>
                <div className="form-wrapper">
                    <motion.table border="1" className="btf-form-table">
                        <tbody>
                            <tr>
                                <td>
                                    <label>IM</label>
                                    <input type="number" value={rows[0].IM} onChange={(e) => handleChange(0, 'IM', e.target.value)} />
                                </td>
                                <td>
                                    <label>Date de validation</label>
                                    <input type="date" value={rows[0].date_validation} onChange={(e) => handleChange(0, 'date_validation', e.target.value)} />
                                </td>
                                <td>
                                    <label>Statut</label>
                                    <select value={rows[0].statut} onChange={(e) => handleChange(0, 'statut', e.target.value)}>
                                        <option value="en_cours">en_cours</option>
                                        <option value="termine">termine</option>
                                    </select>
                                </td>
                                <td>
                                    <label>Date d'expiration</label>
                                    <input type="date" value={rows[0].date_expiration} onChange={(e) => handleChange(0, 'date_expiration', e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </motion.table>
                    <button onClick={handleSubmit}>{isEditing ? "Modifier" : "Ajouter"}</button>
                </div>

                <br />
                <div className="table-wrapper">
                    <h2>Liste des demandes de decision</h2>
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
                                <th>IM</th>
                                <th>Date de validation</th>
                                <th>Statut</th>
                                <th>Date d'expiration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContrats.length > 0 ? (
                                filteredContrats.map((contrat, index) => (
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

export default Decision;
