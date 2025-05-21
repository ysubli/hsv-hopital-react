import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <h1>Bienvenue à l'Hôpital HSV</h1>
        <p>Votre santé, notre priorité.</p>
      </main>
    </div>
  );
}

export default App;
