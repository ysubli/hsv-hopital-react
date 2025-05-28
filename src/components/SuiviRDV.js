import React, { useState, useEffect } from 'react';
import '../styles/SuiviRDV.css';

const SuiviRDV = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRdvs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/rdv');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setRdvs(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRdvs();
  }, []);

  const handleRefresh = () => {
    fetchRdvs();
  };

  return (
    <div className="suivi-rdv">
      <h1>Suivi des Rendez-vous</h1>
      <button onClick={handleRefresh} className="refresh-button">
        Rafraîchir la liste
      </button>
      
      {loading && <div className="loading">Chargement des rendez-vous...</div>}
      
      {error && <div className="error-message">
        Erreur de chargement: {error}. Veuillez réessayer.
      </div>}
      
      {!loading && !error && rdvs.length === 0 && 
        <div className="no-data">Aucun rendez-vous trouvé.</div>
      }
      
      {!loading && !error && rdvs.length > 0 && (
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
      )}
    </div>
  );
};

export default SuiviRDV;
