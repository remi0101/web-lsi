// lib/googleAuth.js

let initialized = false;

export function initializeGoogle(clientId) {
  if (initialized) return;
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });
  initialized = true;
}

let _callback = null;

export function signInWithGoogle(clientId, callback) {
  _callback = callback;
  initializeGoogle(clientId);
  google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
  const { credential } = response;
  if (!credential) return;

  const base64Url = credential.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = JSON.parse(atob(base64));

  console.log("Decoded ID Token payload :", decodedPayload);

  if (_callback) _callback(decodedPayload);
}

export function getAccessToken(clientId, callback) {
  try {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
      callback: (response) => {
        console.log("Token response:", response);
        if (response.access_token) {
          callback(response.access_token);
        } else {
          console.error('Pas de token reçu:', response);
          callback(null);
        }
      },
      error_callback: (error) => {
        console.error('Erreur OAuth:', error);
        if (error.type === 'popup_closed') {
          alert('La fenêtre de connexion a été fermée. Veuillez réessayer.');
        }
        callback(null);
      }
    });

    // Attendre que le DOM soit prêt
    setTimeout(() => {
      client.requestAccessToken({
        prompt: 'consent'
      });
    }, 100);

  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    callback(null);
  }
}