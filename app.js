const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const userServices=require('./controllers/userLogin')


const app = express();


mongoose.connect(config.MONGODB_URL)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((error) => console.error('Erreur de connexion à MongoDB:', error));

const admin = require('./firebase'); // Importer Firebase Admin

  // Fonction pour envoyer une notification
  const sendNotification = async (fcmToken, title, body) => {
    const message = {
      token: fcmToken, // Token FCM de l'utilisateur cible
      notification: {
        title: title, // Titre de la notification
        body: body,   // Corps de la notification
      },
      // Optionnel : Ajouter des données personnalisées
      data: {
        customKey: 'customValue',
      },
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log('Notification envoyée avec succès :', response);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification :', error);
    }
  };
  
app.use(cors());
app.use(express.json());
app.use('/api/userServices',userServices)

app.post('/send-notification', async (req, res) => {
  const { fcmToken, title, body } = req.body;

  if (!fcmToken || !title || !body) {
    return res.status(400).json({ message: 'Token FCM, titre, et corps requis.' });
  }

  try {
    await sendNotification(fcmToken, title, body);
    res.status(200).json({ message: 'Notification envoyée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi de la notification.', error });
  }
});

module.exports = app 
