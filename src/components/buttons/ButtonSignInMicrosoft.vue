<template>
  <button
      @click="login"
      class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded transition duration-150"
  >
    <span>Connexion Microsoft</span>

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
