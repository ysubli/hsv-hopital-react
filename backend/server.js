const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto'); // Module natif de Node.js
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Clé secrète pour l'authentification
const SECRET_KEY = process.env.SECRET_KEY || 'hsv-admin-secret-key';

// Fonction simple pour hacher un mot de passe avec le module crypto natif
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + SECRET_KEY).digest('hex');
}

// Fonction pour générer un token simple
function generateToken(userId, role) {
  const payload = JSON.stringify({ userId, role, exp: Date.now() + 24 * 60 * 60 * 1000 });
  return Buffer.from(payload).toString('base64');
}

// Fonction pour vérifier un token
function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

mongoose.connect('mongodb://localhost:27017/hsv')
  .then(() => {
    console.log('Connecté à MongoDB (Base de données: hsv)');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      console.log('Collections disponibles:', collections.map(c => c.name));
    });
    
    initDefaultAdmin();
  })
  .catch((err) => console.error('Erreur MongoDB:', err));

// Fonction pour initialiser un utilisateur admin par défaut
async function initDefaultAdmin() {
  try {
    // Vérifier si un utilisateur admin existe déjà
    const adminCount = await User.countDocuments();
    
    if (adminCount === 0) {
      // Créer un utilisateur admin par défaut
      const defaultAdmin = new User({
        username: 'admin',
        password: hashPassword('123'),
        role: 'admin'
      });
      
      await defaultAdmin.save();
      console.log('Utilisateur admin par défaut créé avec succès (username: admin, password: 123)');
    } else {
      console.log('Un utilisateur admin existe déjà dans la base de données');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur admin par défaut:', error);
  }
}

// Schéma pour les rendez-vous
const rendezvousSchema = new mongoose.Schema({
  nomComplet: String,
  email: String,
  date: Date,
  service: String
}, { timestamps: true });

// Schéma pour les utilisateurs admin
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

const Rendezvous = mongoose.model('Rendezvous', rendezvousSchema, 'rendez-vous');
const User = mongoose.model('User', userSchema, 'users');

// Middleware d'authentification
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Veuillez vous authentifier' });
  }
};

// Routes pour les rendez-vous (existantes)
app.post('/api/rdv', async (req, res) => {
  console.log('Données reçues:', req.body);
  try {
    const nouveauRdv = new Rendezvous(req.body);
    const rdvSauvegarde = await nouveauRdv.save();
    console.log('RDV sauvegardé dans la collection rendez-vous:', rdvSauvegarde);
    res.status(201).json(rdvSauvegarde);
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/rdv', async (req, res) => {
  try {
    const rdvs = await Rendezvous.find();
    console.log('RDVs trouvés dans la collection rendez-vous:', rdvs.length);
    res.status(200).json(rdvs);
  } catch (error) {
    console.error('Erreur récupération:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour l'authentification admin
app.post('/api/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }
    
    // Hasher le mot de passe avec notre fonction simple
    const hashedPassword = hashPassword(password);
    
    // Créer un nouvel utilisateur
    const user = new User({
      username,
      password: hashedPassword
    });
    
    await user.save();
    res.status(201).json({ message: 'Administrateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    
    // Vérifier le mot de passe avec notre méthode simple
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    
    // Générer un token simple
    const token = generateToken(user._id, user.role);
    
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes protégées pour l'admin
app.get('/api/admin/rdv', authMiddleware, async (req, res) => {
  try {
    const rdvs = await Rendezvous.find().sort({ date: 1 });
    res.json(rdvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/rdv/:id', authMiddleware, async (req, res) => {
  try {
    const rdv = await Rendezvous.findByIdAndDelete(req.params.id);
    if (!rdv) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/rdv/:id', authMiddleware, async (req, res) => {
  try {
    const rdv = await Rendezvous.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!rdv) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    
    res.json(rdv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Statistiques pour le tableau de bord admin
app.get('/api/admin/stats', authMiddleware, async (req, res) => {
  try {
    // Total de rendez-vous
    const totalRdv = await Rendezvous.countDocuments();
    
    // Rendez-vous par service
    const rdvParService = await Rendezvous.aggregate([
      { $group: { _id: "$service", count: { $sum: 1 } } }
    ]);
    
    // Rendez-vous aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const rdvAujourdhui = await Rendezvous.countDocuments({
      date: { $gte: today, $lt: tomorrow }
    });
    
    // Rendez-vous à venir
    const rdvAVenir = await Rendezvous.countDocuments({
      date: { $gt: new Date() }
    });
    
    res.json({
      totalRdv,
      rdvParService,
      rdvAujourdhui,
      rdvAVenir
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
