export async function fetchGmailMessages(accessToken, maxResults = 20) {
  console.log("➡️ Appel Gmail API avec token :", accessToken);

  // 1. Récupérer la liste des messages
  const messagesList = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const listJson = await messagesList.json();
  console.log("🧾 Liste des messages :", listJson);

  if (!listJson.messages || listJson.messages.length === 0) {
    console.warn("Aucun message trouvé");
    return [];
  }

  // 2. Récupérer les détails de chaque message
  const detailedMessages = await Promise.all(
    listJson.messages.map(async (msg) => {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      const data = await response.json();
      console.log("Message détaillé :", data);

      const headers = Object.fromEntries(
        (data.payload?.headers || []).map(h => [h.name, h.value])
      );

      return {
        id: data.id,
        subject: headers.Subject || '(Sans sujet)',
        sender: headers.From || '(Inconnu)',
        date: headers.Date || ''
      };
    })
  );

  console.log("Messages formatés :", detailedMessages);
  return detailedMessages;
}