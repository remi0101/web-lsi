<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full">
      <img src="../assets/vue.svg" alt="Vue logo" class="w-20 h-20 mb-4" />
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Bienvenue sur l'application</h1>
      <p class="text-gray-600 mb-6 text-center">
        Vous n'êtes pas connecté.<br>
        Veuillez vous connecter pour accéder à toutes les fonctionnalités.
      </p>
      <div class="w-full flex flex-col gap-4">
        <ButtonSignInGoogle />
        <ButtonSignInMicrosoft />
      </div>
    </div>
  </div>
</template>


<script setup>
import ButtonSignInGoogle from "../components/buttons/ButtonSignInGoogle.vue";
import ButtonSignInMicrosoft from "../components/buttons/ButtonSignInMicrosoft.vue";
</script>