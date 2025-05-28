import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/admin/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/admin/login');
          return;
        }
        throw new Error('Erreur lors de la récupération des statistiques');
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Fonction pour traduire le nom des services
  const translateService = (service) => {
    const translations = {
      'general': 'Médecine générale',
      'cardio': 'Cardiologie',
      'dermato': 'Dermatologie'
    };
    return translations[service] || service;
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <div className="admin-navbar-brand">HSV Admin</div>
        <ul className="admin-navbar-nav">
          <li className="admin-nav-item active">
            <Link to="/admin/dashboard">Tableau de bord</Link>
          </li>
          <li className="admin-nav-item">
            <Link to="/admin/rdv">Rendez-vous</Link>
          </li>
        </ul>
        <button className="admin-logout-button" onClick={handleLogout}>
          Déconnexion
        </button>
      </nav>

      <div className="admin-content">
        <h1>Tableau de bord administrateur</h1>
        
        {loading && <div className="admin-loading">Chargement des données...</div>}
        
        {error && <div className="admin-error">{error}</div>}
        
        {stats && (
          <div className="admin-stats-container">
            <div className="admin-stat-card">
              <div className="admin-stat-value">{stats.totalRdv}</div>
              <div className="admin-stat-label">Total des rendez-vous</div>
            </div>
            
            <div className="admin-stat-card">
              <div className="admin-stat-value">{stats.rdvAujourdhui}</div>
              <div className="admin-stat-label">Rendez-vous aujourd'hui</div>
            </div>
            
            <div className="admin-stat-card">
              <div className="admin-stat-value">{stats.rdvAVenir}</div>
              <div className="admin-stat-label">Rendez-vous à venir</div>
            </div>
          </div>
        )}
        
        {stats && stats.rdvParService && (
          <div className="admin-chart-container">
            <h2>Répartition par service</h2>
            <div className="admin-service-chart">
              {stats.rdvParService.map((service) => (
                <div key={service._id} className="admin-service-bar">
                  <div className="admin-service-name">{translateService(service._id)}</div>
                  <div className="admin-service-bar-container">
                    <div 
                      className="admin-service-bar-fill" 
                      style={{ 
                        width: `${(service.count / stats.totalRdv) * 100}%` 
                      }}
                    ></div>
                    <div className="admin-service-count">{service.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="admin-actions">
          <Link to="/admin/rdv" className="admin-action-button">
            Gérer les rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
