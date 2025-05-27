<template>
  <button
      @click="logout"
      class="text-sm font-medium text-white bg-[#4A919E] hover:bg-[#3b7a87] px-4 py-2 rounded-lg transition duration-150"
  >
    Déconnexion
  </button>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const logout = () => {
  localStorage.removeItem('access_token')
  store.commit('clearUser')
  router.push('/')
}
</script>
