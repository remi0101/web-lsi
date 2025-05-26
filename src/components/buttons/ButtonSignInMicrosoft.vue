<template>
  <button
      @click="login"
      class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white border border-blue-700 rounded-xl shadow-sm hover:bg-blue-700 transition text-base font-medium"
  >
    <svg class="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
    Se connecter avec Microsoft
  </button>
</template>


<script setup>
import { useStore } from 'vuex'
import {signInAndGetUser} from "../../lib/microsoftGraph.js";
import {useRouter} from "vue-router";


const store = useStore()
const router = useRouter()

const login = async () => {
  signInAndGetUser()
      .then(res => {
        store.dispatch('updateUser', res.idTokenClaims)
        router.push('/mails')
      })
      .catch(err => console.error(err))
}
</script>
