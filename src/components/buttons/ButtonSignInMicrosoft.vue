<template>
  <button
      @click="login"
      class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#2F2F91] hover:bg-[#25257a] transition duration-150 shadow-md"
  >
    <svg class="w-5 h-5" viewBox="0 0 24 24">
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


const store = useStore()

const login = async () => {
  signInAndGetUser().then(res => store.dispatch('updateUser', res.idTokenClaims))
      .catch(err => console.error(err))
}
</script>
