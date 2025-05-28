import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/admin/AdminRDV.css';

const AdminRDV = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRdv, setSelectedRdv] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete'
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    date: '',
    service: ''
  });
  
  const navigate = useNavigate();

  const fetchRdvs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/rdv', {
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
        throw new Error('Erreur lors de la récupération des rendez-vous');
      }

      const data = await response.json();
      setRdvs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRdvs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const openViewModal = (rdv) => {
    setSelectedRdv(rdv);
    setModalMode('view');
    setShowModal(true);
  };

  const openEditModal = (rdv) => {
    setSelectedRdv(rdv);
    setFormData({
      nomComplet: rdv.nomComplet,
      email: rdv.email,
      date: new Date(rdv.date).toISOString().split('T')[0],
      service: rdv.service
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const openDeleteModal = (rdv) => {
    setSelectedRdv(rdv);
    setModalMode('delete');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRdv(null);
    setFormData({
      nomComplet: '',
      email: '',
      date: '',
      service: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/rdv/${selectedRdv._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du rendez-vous');
      }

      // Rafraîchir la liste des rendez-vous
      fetchRdvs();
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/rdv/${selectedRdv._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du rendez-vous');
      }

      // Rafraîchir la liste des rendez-vous
      fetchRdvs();
      closeModal();
    } catch (error) {
      setError(error.message);
    }
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
    <div className="admin-rdv">
      <nav className="admin-navbar">
        <div className="admin-navbar-brand">HSV Admin</div>
        <ul className="admin-navbar-nav">
          <li className="admin-nav-item">
            <Link to="/admin/dashboard">Tableau de bord</Link>
          </li>
          <li className="admin-nav-item active">
            <Link to="/admin/rdv">Rendez-vous</Link>
          </li>
        </ul>
        <button className="admin-logout-button" onClick={handleLogout}>
          Déconnexion
        </button>
      </nav>

      <div className="admin-content">
        <h1>Gestion des rendez-vous</h1>
        
        {loading && <div className="admin-loading">Chargement des rendez-vous...</div>}
        
        {error && <div className="admin-error">{error}</div>}
        
        {!loading && rdvs.length === 0 && (
          <div className="admin-no-data">Aucun rendez-vous trouvé</div>
        )}
        
        {!loading && rdvs.length > 0 && (
          <div className="admin-rdv-table-container">
            <table className="admin-rdv-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rdvs.map((rdv) => (
                  <tr key={rdv._id}>
                    <td>{rdv.nomComplet}</td>
                    <td>{rdv.email}</td>
                    <td>{new Date(rdv.date).toLocaleDateString()}</td>
                    <td>{translateService(rdv.service)}</td>
                    <td className="admin-actions-cell">
                      <button 
                        className="admin-action-btn view"
                        onClick={() => openViewModal(rdv)}
                      >
                        Voir
                      </button>
                      <button 
                        className="admin-action-btn edit"
                        onClick={() => openEditModal(rdv)}
                      >
                        Modifier
                      </button>
                      <button 
                        className="admin-action-btn delete"
                        onClick={() => openDeleteModal(rdv)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal pour voir, modifier ou supprimer un rendez-vous */}
      {showModal && selectedRdv && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              {modalMode === 'view' && <h2>Détails du rendez-vous</h2>}
              {modalMode === 'edit' && <h2>Modifier le rendez-vous</h2>}
              {modalMode === 'delete' && <h2>Supprimer le rendez-vous</h2>}
              <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="admin-modal-body">
              {modalMode === 'view' && (
                <div className="admin-rdv-details">
                  <p><strong>Patient:</strong> {selectedRdv.nomComplet}</p>
                  <p><strong>Email:</strong> {selectedRdv.email}</p>
                  <p><strong>Date:</strong> {new Date(selectedRdv.date).toLocaleDateString()}</p>
                  <p><strong>Service:</strong> {translateService(selectedRdv.service)}</p>
                  <p><strong>Créé le:</strong> {new Date(selectedRdv.createdAt).toLocaleString()}</p>
                </div>
              )}
              
              {modalMode === 'edit' && (
                <form className="admin-edit-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nomComplet">Nom complet</label>
                    <input
                      type="text"
                      id="nomComplet"
                      name="nomComplet"
                      value={formData.nomComplet}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="service">Service</label>
                    <select
                      id="service"
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
                  
                  <button type="submit" className="admin-submit-btn">
                    Enregistrer les modifications
                  </button>
                </form>
              )}
              
              {modalMode === 'delete' && (
                <div className="admin-delete-confirmation">
                  <p>
                    Êtes-vous sûr de vouloir supprimer ce rendez-vous pour {selectedRdv.nomComplet} 
                    le {new Date(selectedRdv.date).toLocaleDateString()} ?
                  </p>
                  <p className="admin-warning">Cette action est irréversible.</p>
                  <div className="admin-delete-actions">
                    <button className="admin-cancel-btn" onClick={closeModal}>
                      Annuler
                    </button>
                    <button className="admin-confirm-delete-btn" onClick={handleDelete}>
                      Confirmer la suppression
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRDV;
