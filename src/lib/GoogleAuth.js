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

// ➕ Ajout : pour récupérer un access token
export function getAccessToken(clientId, callback) {
  google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    callback: (tokenResponse) => {
      console.log("Access Token reçu :", tokenResponse);
      callback(tokenResponse.access_token);
    }
  }).requestAccessToken();
}
