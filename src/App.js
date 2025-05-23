import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PriseRDV from './components/PriseRDV';
import SuiviRDV from './components/SuiviRDV';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prise-rdv" element={<PriseRDV />} />
          <Route path="/suivi" element={<SuiviRDV />} />
        </Routes>
      </div>
    </Router>
  );
}

// Composant Home pour la page d'accueil
const Home = () => {
  return (
    <main className="main-content">
      <h1>Bienvenue à l'Hôpital HSV</h1>
      <p>Votre santé, notre priorité.</p>
      
      <div className="rdv-button-container">
        <button className="rdv-button" onClick={() => window.location.href='#prise'}>
          Prendre RDV
        </button>
      </div>
      
      <section className="cards-section">
        <h2>Nos prestations</h2>
        <div className="cards-container">
          <div className="card">
            <img src="/images/hospital.jpg" className="card-image" />
            <h3>Services de qualité</h3>
            <p>Notre hôpital propose une gamme complète de services médicaux avec des équipements de pointe pour assurer les meilleurs soins possibles à nos patients.</p>
          </div>
          
          <div className="card">
            <img src="/images/doctors.jpg" className="card-image" />
            <h3>Équipe expérimentée</h3>
            <p>Notre personnel médical hautement qualifié et expérimenté est dédié à fournir des soins personnalisés et attentionnés à chaque patient.</p>
          </div>
          
          <div className="card">
            <img src="/images/emergency.jpg" className="card-image" />
            <h3>Disponibilité 24/7</h3>
            <p>Nos services d'urgence sont disponibles 24 heures sur 24, 7 jours sur 7, pour répondre à tous vos besoins médicaux urgents.</p>
          </div>
        </div>
        
        <div className="cards-container">
          <div className="card">
            <img src="/images/treatment.jpg" className="card-image" />
            <h3>Traitements innovants</h3>
            <p>Nous utilisons les dernières avancées médicales et technologies pour offrir des traitements innovants et efficaces.</p>
          </div>
          
          <div className="card">
            <img src="/images/care.jpg" className="card-image" />
            <h3>Approche humaine</h3>
            <p>Au-delà des soins médicaux, nous privilégions une approche humaine et bienveillante pour le bien-être complet de nos patients.</p>
          </div>
          
          <div className="card">
            <img src="/images/access.jpg" className="card-image" />
            <h3>Accessibilité</h3>
            <p>Notre établissement est facilement accessible et nous proposons également des consultations à distance pour plus de flexibilité.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
