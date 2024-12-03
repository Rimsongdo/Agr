const axios = require('axios'); 
const admin = require('../firebase'); 
const express=require('express') // Pour hasher le mot de passe
const sendNotifs = express.Router();

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
sendNotifs.post('/send-notification', async (req, res) => {
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

  module.exports=sendNotifs;