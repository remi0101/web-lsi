<template>
  <button
      @click="handleGoogleLogin"
      class="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition text-base font-medium"
  >
    <svg class="w-6 h-6" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.4l6.8-6.8C35.3 2.3 29.9 0 24 0 14.8 0 6.9 5.2 2.8 12.8l8.3 6.5C13 13.4 18.1 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.5c-.5 3.1-2.3 5.8-4.9 7.7l7.6 5.9c4.4-4.1 7-10.2 7-17.3z"/>
      <path fill="#FBBC05" d="M11.1 28.5c-.5-1.6-.8-3.2-.8-4.9s.3-3.3.8-4.9l-8.3-6.5C1.1 16.6 0 20.2 0 24s1.1 7.4 2.8 10.4l8.3-6.5z"/>
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8.4 2.3-5.9 0-11-3.9-12.9-9.2l-8.3 6.5C6.9 42.8 14.8 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
    Se connecter avec Google
  </button>
</template>

<script setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {signInWithGoogle, createAccessTokenClient} from '../../lib/GoogleAuth'
import {fetchGmailMessages} from '../../lib/GmailAPI'

const store = useStore()
const router = useRouter()
const clientId = "111787640120-t35tlg3c4gs15lagb1o15eln9se2rpag.apps.googleusercontent.com"

// Lance la connexion Google (ID token)
const handleGoogleLogin = async () => {
  signInWithGoogle(clientId, async (userData) => {
    store.dispatch('updateUser', {
      name: userData.name,
      email: userData.email,
      picture: userData.picture
    })

    const tokenClient = createAccessTokenClient(clientId, async (accessToken) => {
      if (!accessToken) {
        alert("Aucun token reçu");
        return;
      }

      try {
        const mails = await fetchGmailMessages(accessToken);
        if (mails?.length > 0) {
          store.dispatch('updateMails', mails);
          router.push('/mails');
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des mails :", err);
        alert("Impossible de récupérer les mails");
      }
    });

    tokenClient.requestAccessToken()
  })
}
</script>
