import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './style/configuration.css';

// Enregistrer les composants ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Accueil = () => {

    const [stats, setStats] = useState({
        totalDemandes: 0,
        totalDemandes1: 0,
        totalDemandes2: 0,
        enCours: 0,
        termine: 0
    });

    // Fonction pour récupérer les statistiques
    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/stat/decision');
            const response1 = await axios.get('http://localhost:3000/stat/conge');
            const response2 = await axios.get('http://localhost:3000/stat/jouissance');
            const data = response.data;
            const data1 = response1.data;
            const data2 = response2.data;

            // Vérifiez la structure des données ici
            console.log('Data reçu de l\'API:', data);

            // Calculer les statistiques
            const totalDemandes = data.length;
            const totalDemandes1 = data1.length;
            const totalDemandes2 = data2.length;
            const enCours = data.filter(contrat => contrat.statut === 'en_cours').length;
            const termine = data.filter(contrat => contrat.statut === 'termine').length;

            setStats({ totalDemandes,totalDemandes1,totalDemandes2, enCours, termine });
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques :', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []); // Vous pouvez ajouter d'autres dépendances si nécessaire pour déclencher ce useEffect

    // Données pour le graphique
    const chartData = {
        labels: ['Total des demandes decision','Total des demandes congé','Total des demandes jouissance', 'En cours', 'Terminé'],
        datasets: [
            {
                label: 'Demandes de décision',
                data: [stats.totalDemandes,stats.totalDemandes1,stats.totalDemandes2, stats.enCours, stats.termine],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#36A2EB', '#FFCE56'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56','#36A2EB', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    // Options du graphique
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Statistiques des demandes de décision',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
      <>
              <h3>Statistiques</h3>
      <div className="config-item">
        <p><strong>Nombre demande de decision:</strong> {stats.totalDemandes}</p>
        <p><strong>Nombre demande de conge: :</strong> {stats.totalDemandes1}</p>
        <p><strong>Nombre de demande de jouissance:</strong> {stats.totalDemandes2}</p>
        <p><strong>Nombre de decision en cour:</strong> {stats.enCours}</p>
        <p><strong>Nombre de decisin Terminé:</strong> {stats.termine}</p>
      </div>

            <h2>Statistiques des demandes de décision</h2>
            <div  className="chart-container" style={{ width: '900px', margin: '0 auto' }}>
           
            <Bar data={chartData} options={chartOptions} />
        </div>
      
      </>

    );
};

export default Accueil;
