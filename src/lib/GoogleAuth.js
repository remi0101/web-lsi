let initialized = false;

export function initializeGoogle(clientId) {
  if (initialized) return;
  google.accounts.id.initialize({
    client_id: clientId,
    use_fedcm: false,
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

  if (_callback) _callback(decodedPayload);
}

export function createAccessTokenClient(clientId, onToken) {
  return google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    prompt: 'consent',
    callback: (response) => {
      if (response.access_token) {
        onToken(response.access_token);
      } else {
        console.error('Pas de token dans la réponse:', response);
        onToken(null);
      }
    }
  });
}