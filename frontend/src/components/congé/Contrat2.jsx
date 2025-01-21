import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contrat2 = () => {
     const initialRow = { id:"",Immatricule:"",name:"",firstName:"",corps:"", assimilation:"",diplomer:"", services:"",ciscolaire:"",date_services:"",date_effet:"",duration:"",index:"", };
    

    const [rows, setRows] = useState([initialRow]);
    const [ContratList, setContratList] = useState([]);
    
    
    const fetchContratList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api_contrat2');
            console.log('Données reçues :', response.data); 
            setContratList(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des BTFs :', error);
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

    const handleSubmit = async () => {
        const dataToSend = rows.map(row => ({
           
            id: row.id,
            Immatricule: row.Immatricule,
            name: row.name,
            firstName: row.firstName,
            corps: row.corps,
            assimilation: row.assimilation,
            diplomer: row.diplomer,
            services: row.services,
            ciscolaire: row.ciscolaire,
            date_services: row.date_services,
            date_effet: row.date_effet,
            duration: row.duration,
        }));

        try {
            for (const data of dataToSend) {
                await axios.post('http://localhost:3000/api_contrat2', data);
            }
            alert('Données envoyées avec succès !');
            fetchBtfList();
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
        }
    };

  return (
    <>
    <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="main-content-btf"
        >
            <h1>Formulaire d'ajout de contrat</h1>
            <div className="form-wrapper">
   
                <motion.table
                    border="1"
                    className="btf-form-table"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    
                    <thead>
                        <tr>
                            <th>Immatricule</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Corps</th>
                            <th>Assimilation</th>
                            <th>Diplome</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <td>
                                    <input
                                        type="text"
                                        value={row.id}
                                        onChange={(e) => handleChange(index, 'maturite', e.target.value)}
                                        placeholder="id"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.Immatricule}
                                        onChange={(e) => handleChange(index, 'maturite', e.target.value)}
                                        placeholder="IM"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) => handleChange(index, 'montant_annonce', e.target.value)}
                                        placeholder="Nom"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.firstName}
                                        onChange={(e) => handleChange(index, 'taux_interet', e.target.value)}
                                        placeholder="Prenon"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.corps}
                                        onChange={(e) => handleChange(index, 'date_echeance', e.target.value)}
                                        placeholder="Corps"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.assimilation}
                                        onChange={(e) => handleChange(index, 'maturite', e.target.value)}
                                        placeholder="assimulation"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.diplomer}
                                        onChange={(e) => handleChange(index, 'montant_annonce', e.target.value)}
                                        placeholder="Diplome"
                                    />
                                </td>

                                
                            </motion.tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>CISCO</th>
                            <th>Date de service</th>
                            <th>Date d'effet</th>
                            <th>Duree</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                                                <td>
                                    <input
                                        type="text"
                                        value={row.services}
                                        onChange={(e) => handleChange(index, 'montant_annonce', e.target.value)}
                                        placeholder="Service"
                                    />
                                </td>
           
                                <td>
                                    <input
                                        type="text"
                                        value={row.ciscolaire}
                                        onChange={(e) => handleChange(index, 'taux_interet', e.target.value)}
                                        placeholder="CISCO"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.date_services}
                                        onChange={(e) => handleChange(index, 'date_echeance', e.target.value)}
                                        placeholder="Date de service"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.date_effet}
                                        onChange={(e) => handleChange(index, 'date_emission', e.target.value)}
                                        placeholder="Date d'effet"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.duration}
                                        onChange={(e) => handleChange(index, 'date_emission', e.target.value)}
                                        placeholder="Duréé"
                                    />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
                <div>
                    
                    <button onClick={handleSubmit}>Soumettre</button>
                </div>
            </div>
            
            {/*Liste de tableau*/}
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Immatricule</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Corps</th>
                            <th>Assimilation</th>
                            <th>date_services</th>
                            <th>date_effet</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ContratList.map((btf, index) => (
                            <tr key={index}>
                                <td>{btf.id}</td>
                                <td>{btf.Immatricule}</td>
                                <td>{btf.name}</td>
                                <td>{btf.firstName}</td>
                                <td>{btf.corps}</td>
                                <td>{btf.assimilation}</td>
                                <td>{btf.date_services}</td>
                                <td>{btf.date_effet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    </>
  )
}

export default Contrat2