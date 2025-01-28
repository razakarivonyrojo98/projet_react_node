import React from "react";

const Status = ({ acceptedList, refusedList, formatDate }) => {
  return (
    <div>
      {/* Table des demandes acceptées */}
      <div className="table-wrapper">
        <h2>Demandes Acceptées</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Immatricule</th>
              <th>Lieu</th>
              <th>Motif</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {acceptedList.map((contrat) => (
              <tr key={contrat.id}>
                <td>{contrat.id}</td>
                <td>{contrat.Immatricule}</td>
                <td>{contrat.Lieu}</td>
                <td>{contrat.Motif}</td>
                <td>{formatDate(contrat.date_debut)}</td>
                <td>{formatDate(contrat.date_fin)}</td>
                <td>{contrat.jour_demande}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table des demandes refusées */}
      <div className="table-wrapper">
        <h2>Demandes Refusées</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Immatricule</th>
              <th>Lieu</th>
              <th>Motif</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {refusedList.map((contrat) => (
              <tr key={contrat.id}>
                <td>{contrat.id}</td>
                <td>{contrat.Immatricule}</td>
                <td>{contrat.Lieu}</td>
                <td>{contrat.Motif}</td>
                <td>{formatDate(contrat.date_debut)}</td>
                <td>{formatDate(contrat.date_fin)}</td>
                <td>{contrat.jour_demande}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
