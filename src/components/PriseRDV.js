import React, { useState } from 'react';
import '../styles/PriseRDV.css';

const PriseRDV = () => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    date: '',
    service: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Envoi des données:', formData);
      
      const response = await fetch('http://localhost:5000/api/rdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Rendez-vous enregistré avec succès!');
        setFormData({ nomComplet: '', email: '', date: '', service: '' });
      } else {
        alert(`Erreur: ${data.error || 'Erreur inconnue'}`);
        console.error('Détails de l\'erreur:', data);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Erreur de connexion au serveur. Vérifiez que le serveur backend est bien démarré.');
    }
  };

  return (
    <div className="prise-rdv">
      <h1>Prise de Rendez-vous</h1>
      <form className="rdv-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom complet</label>
          <input 
            type="text" 
            name="nomComplet"
            value={formData.nomComplet}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date souhaitée</label>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Service</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un service</option>
            <option value="general">Médecine générale</option>
            <option value="cardio">Cardiologie</option>
            <option value="dermato">Dermatologie</option>
          </select>
        </div>
        <button type="submit">Confirmer le rendez-vous</button>
      </form>
    </div>
  );
};

export default PriseRDV;
