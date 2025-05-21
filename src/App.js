import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <h1>Bienvenue à l'Hôpital HSV</h1>
        <p>Votre santé, notre priorité.</p>
        <Carousel />
        <div className="rdv-button-container">
          <button className="rdv-button" onClick={() => window.location.href='#prise'}>
            Prendre RDV
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
