import * as msal from '@azure/msal-browser'

/**
 * List the requested scopes (aka. the requested permissions)
 */
export const requestedScopes = {
    scopes: ["User.Read"]
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

//if using "msale v3.x", otherwise in "msale v2.x" delete the next line
msalInstance.initialize();

export async function signInAndGetUser () {
    const authResult = await msalInstance.loginPopup(requestedScopes)
    msalInstance.setActiveAccount(authResult.account)
    return authResult
}