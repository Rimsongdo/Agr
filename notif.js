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

module.exports = sendNotification;
