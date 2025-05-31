/**
 * Récupère les messages Gmail de l'utilisateur connecté
 * @param {string} accessToken - Token d'accès OAuth2 Google
 * @param {number} maxResults - Nombre maximum de messages à récupérer
 * @returns {Promise<Array>} Liste des messages formatés
 */
export async function fetchGmailMessages(accessToken, maxResults = 20) {

  try {
    // 1. Récupérer la liste des IDs des messages
    const messagesList = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const listJson = await messagesList.json();

    if (!listJson.messages || listJson.messages.length === 0) {
      console.warn("Aucun message trouvé");
      return [];
    }

    // 2. Récupérer les détails de chaque message
    const detailedMessages = await Promise.all(
      listJson.messages.map(async (msg) => {
        try {
          const response = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          const data = await response.json();

          // Extraire les headers (From, Subject, Date)
          const headers = Object.fromEntries(
            (data.payload?.headers || []).map(h => [h.name, h.value])
          );

          // Extraire le contenu du message
          let content = '';
          if (data.payload?.body?.data) {
            // Cas 1: Le contenu est directement dans body.data
            content = atob(data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
          } else if (data.payload?.parts) {
            // Cas 2: Le contenu est dans une partie text/plain
            const textPart = data.payload.parts.find(part => part.mimeType === 'text/plain');
            if (textPart?.body?.data) {
              content = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
            }
          }

          // Formater le message pour l'application
          return {
            id: data.id,
            threadId: data.threadId,
            subject: headers.Subject || '(Sans sujet)',
            sender: headers.From || '(Inconnu)',
            recipient: headers.To || '(Inconnu)',
            date: headers.Date || '',
            content: content || '(Pas de contenu)',
            labelIds: data.labelIds || []
          };
        } catch (error) {
          console.error(` Erreur lors de la récupération du message ${msg.id}:`, error);
          return null;
        }
      })
    );

    // Filtrer les messages en erreur et les trier par date
    const validMessages = detailedMessages
      .filter(msg => msg !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return validMessages;

  } catch (error) {
    console.error(" Erreur globale lors de la récupération des messages:", error);
    throw error;
  }
}