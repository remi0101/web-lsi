<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par expéditeur, mot-clé ou date"
          class="border px-4 py-2 rounded w-1/2"
      />
      <button @click="goToCreate" class="bg-[#4A919E] text-white px-4 py-2 rounded">
        Nouveau Mail
      </button>
    </div>

    <ul class="space-y-4">
      <li
          v-for="mail in filteredMails"
          :key="mail.id"
          class="p-4 bg-white rounded shadow flex justify-between items-center cursor-pointer hover:bg-gray-50"
          @click="openMail(mail.id)"
      >
        <div>
          <h3 class="text-lg font-semibold">{{ mail.subject }}</h3>
          <p class="text-sm text-gray-500">De: {{ mail.sender }} | {{ formatDate(mail.date) }}</p>
        </div>
        <button @click.stop="deleteMail(mail.id)">
          <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-700" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { TrashIcon } from 'lucide-vue-next'
import { dummyMails } from '../fixtures/mails.js'

const router = useRouter()
const store = useStore()

onMounted(() => {
  console.log("Mails dans le store:", store.state.mails)
})

const searchQuery = ref('')

const filteredMails = computed(() => {
  const mails = store.state.mails
  if (!searchQuery.value) return mails
  const q = searchQuery.value.toLowerCase()
  return mails.filter(mail =>
      mail.sender.toLowerCase().includes(q) ||
      mail.subject.toLowerCase().includes(q) ||
      mail.date.includes(q)
  )
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR')
}

function deleteMail(id) {
  const remainingMails = store.state.mails.filter(mail => mail.id !== id)
  store.commit('setMails', remainingMails)
}

function openMail(id) {
  router.push(`/mails/${id}`)
}

function goToCreate() {
  router.push('/mails/new')
}

</script>