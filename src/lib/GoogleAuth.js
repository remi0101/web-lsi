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
  const client = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    prompt: 'consent',
    callback: (response) => {
      console.log("Token response reçue");
      if (response.access_token) {
        callback(response.access_token);
      } else {
        console.error('Pas de token dans la réponse:', response);
        callback(null);
      }
    }
  });

  try {
    client.requestAccessToken();
  } catch (error) {
    console.error("Erreur lors de la demande du token:", error);
    callback(null);
  }
}