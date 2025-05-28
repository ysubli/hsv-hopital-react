import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PriseRDV from './pages/PriseRDV';
import SuiviRDV from './pages/SuiviRDV';
import Propos from './pages/Propos';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRDV from './pages/admin/AdminRDV';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      <div className="App">
        {!isAdminRoute && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prise-rdv" element={<PriseRDV />} />
          <Route path="/suivi" element={<SuiviRDV />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rdv" element={<AdminRDV />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
