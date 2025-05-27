<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
    <h1 class="text-6xl font-bold text-[#4A919E] mb-4">404</h1>
    <p class="text-xl text-gray-700 mb-6">Oups ! La page que vous recherchez n'existe pas.</p>
    <router-link
        to="/"
        class="px-6 py-3 text-white bg-[#4A919E] hover:bg-[#3b7a87] rounded-lg font-medium shadow-md transition duration-150"
    >
      Retour à l'accueil
    </router-link>
  </div>
</template>
