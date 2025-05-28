import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PriseRDV from './pages/PriseRDV';
import SuiviRDV from './pages/SuiviRDV';
import Propos from './pages/Propos';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prise-rdv" element={<PriseRDV />} />
          <Route path="/suivi" element={<SuiviRDV />} />
          <Route path="/propos" element={<Propos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
