export async function fetchGmailMessages(accessToken, maxResults = 20) {
  const decodeBase64 = (str) => {
    try {
      const decoded = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
      return decodeURIComponent(escape(decoded));
    } catch {
      return '';
    }
  };

  try {
    const messagesList = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
    );

    const listJson = await messagesList.json();

    if (!listJson.messages || listJson.messages.length === 0) {
      console.warn("Aucun message trouvé");
      return [];
    }

    const detailedMessages = await Promise.all(
        listJson.messages.map(async (msg) => {
          try {
            const response = await fetch(
                `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                }
            );

            const data = await response.json();

            const headers = Object.fromEntries(
                (data.payload?.headers || []).map((h) => [h.name, h.value])
            );

            // Chercher le contenu HTML ou fallback texte
            let content = '';

            if (data.payload?.mimeType === 'text/html' && data.payload.body?.data) {
              content = decodeBase64(data.payload.body.data);
            } else if (data.payload?.parts) {
              const htmlPart = data.payload.parts.find((p) => p.mimeType === 'text/html');
              const textPart = data.payload.parts.find((p) => p.mimeType === 'text/plain');

              if (htmlPart?.body?.data) {
                content = decodeBase64(htmlPart.body.data);
              } else if (textPart?.body?.data) {
                // fallback en HTML formaté si pas de HTML
                const plain = decodeBase64(textPart.body.data);
                content = plain.replace(/(\r\n|\n|\r)/g, '<br>');
              }
            } else if (data.payload?.body?.data) {
              content = decodeBase64(data.payload.body.data);
            }

            return {
              id: data.id,
              threadId: data.threadId,
              subject: headers.Subject || '(Sans sujet)',
              sender: headers.From || '(Inconnu)',
              recipient: headers.To || '(Inconnu)',
              date: headers.Date || '',
              content: content || '(Pas de contenu)',
              labelIds: data.labelIds || [],
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération du message ${msg.id}:`, error);
            return null;
          }
        })
    );

    return detailedMessages
        .filter((msg) => msg !== null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Erreur globale lors de la récupération des messages:", error);
    throw error;
  }
}
