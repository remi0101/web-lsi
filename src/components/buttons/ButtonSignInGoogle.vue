<template>
  <button
    @click="handleGoogleSignIn"
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const clientId = "665918691478-n39i7gq4qpduq4vd15ftsme38fhrn2h6.apps.googleusercontent.com"

const handleGoogleSignIn = () => {
  console.log("Tentative de connexion Google")

  if (typeof google === 'undefined') {
    alert("Google Identity API non chargée")
    return
  }

  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      if (!response.credential) {
        console.error("Pas de token reçu")
        return
      }

      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))

      console.log("Payload décodé :", payload)

      store.dispatch('updateUser', {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        provider: 'google'
      })

      router.push('/mails')
    }
  })

  google.accounts.id.prompt((notification) => {
    console.log("Notification Google ID:", notification)
  })
}
</script>
