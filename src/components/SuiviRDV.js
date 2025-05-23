import React, { useState, useEffect } from 'react';
import '../styles/SuiviRDV.css';

const SuiviRDV = () => {
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    const fetchRdvs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rdv');
        const data = await response.json();
        setRdvs(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchRdvs();
  }, []);

  return (
    <div className="suivi-rdv">
      <h1>Suivi des Rendez-vous</h1>
      <div className="rdv-list">
        {rdvs.map((rdv, index) => (
          <div key={rdv._id || index} className="rdv-card">
            <h3>Patient: {rdv.nomComplet}</h3>
            <p>Email: {rdv.email}</p>
            <p>Date: {new Date(rdv.date).toLocaleDateString()}</p>
            <p>Service: {rdv.service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuiviRDV;
