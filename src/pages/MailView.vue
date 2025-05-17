<!-- MailView.vue -->
<template>
  <div class="max-w-3xl mx-auto p-6 space-y-4">
    <template v-if="mail.id !== 0">
      <h2 class="text-xl font-bold">{{ mail.subject }}</h2>
      <p class="text-sm text-gray-500">De : {{ mail.sender }} | {{ formatDate(mail.date) }}</p>
      <div class="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {{ mail.content }}
      </div>

      <h3 class="text-lg font-semibold mt-6">Répondre</h3>
      <textarea v-model="response" rows="5" class="w-full border p-2 rounded"></textarea>
      <button @click="reply" class="mt-2 bg-[#4A919E] text-white px-4 py-2 rounded">Envoyer</button>
    </template>

    <template v-else>
      <div class="text-center bg-[#FDEDED] text-[#B55353] p-6 rounded-md">
        <h2 class="text-2xl font-bold mb-4">Mail non trouvé</h2>
        <p>Nous n’avons pas pu trouver le mail demandé.</p>
        <button @click="goBack" class="mt-4 bg-[#4A919E] text-white px-4 py-2 rounded hover:bg-[#417B85] transition">
          Retour à la liste des mails
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()
const mailId = Number(route.params.id)

const mails = computed(() => store.state.mails)

const mail = computed(() => mails.value.find(m => m.id === mailId) || {
  id: 0,
  sender: '',
  subject: '',
  content: '',
  date: ''
})

const response = ref('')

function reply() {
  console.log('Réponse envoyée:', response.value)
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR')
}

function goBack() {
  router.push('/mails')
}
</script>
