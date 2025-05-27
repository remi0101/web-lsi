import * as msal from '@azure/msal-browser'

/**
 * List the requested scopes (aka. the requested permissions)
 */
export const requestedScopes = {
    scopes: ["User.Read", "Mail.Read"]
}

const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: "e8137439-4d1d-462d-a85f-f81cfea8f0d8",
        mainWindowRedirectUri: "/"
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
})

msalInstance.initialize();

export async function signInAndGetUser () {
    const authResult = await msalInstance.loginPopup(requestedScopes)
    msalInstance.setActiveAccount(authResult.account)
    return authResult
}

export async function getMails(token) {
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error("Erreur lors de la récupération des mails:", error);
        throw error;
    }
}
