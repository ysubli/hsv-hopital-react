const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Simplifions la connexion MongoDB
mongoose.connect('mongodb://localhost:27017/hsv-hopital')
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    // Afficher les collections existantes
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      console.log('📁 Collections:', collections.map(c => c.name));
    });
  })
  .catch((err) => console.error('Erreur MongoDB:', err));

const rendezvousSchema = new mongoose.Schema({
  nomComplet: String,
  email: String,
  date: Date,
  service: String
}, { timestamps: true });

const Rendezvous = mongoose.model('Rendezvous', rendezvousSchema);

// Route POST avec plus de logs
app.post('/api/rdv', async (req, res) => {
  console.log('📝 Données reçues:', req.body);
  try {
    const nouveauRdv = new Rendezvous(req.body);
    const rdvSauvegarde = await nouveauRdv.save();
    console.log('✅ RDV sauvegardé dans la collection:', rdvSauvegarde);
    res.status(201).json(rdvSauvegarde);
  } catch (error) {
    console.error('❌ Erreur sauvegarde:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route GET avec plus de logs
app.get('/api/rdv', async (req, res) => {
  try {
    const rdvs = await Rendezvous.find();
    console.log('📋 RDVs trouvés:', rdvs.length);
    res.status(200).json(rdvs);
  } catch (error) {
    console.error('❌ Erreur récupération:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
