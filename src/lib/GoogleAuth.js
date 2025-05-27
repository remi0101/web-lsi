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

  google.accounts.id.prompt(); //popup Google
}

function handleCredentialResponse(response) {
  const { credential } = response;
  if (!credential) return;

  //JWT
  const base64Url = credential.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = JSON.parse(atob(base64));

  // Transmettre les infos au callback 
  if (_callback) _callback(decodedPayload);
}
