<template>
  <div class="max-w-2xl mx-auto p-6 space-y-4">
    <h2 class="text-2xl font-semibold">Créer un nouveau mail</h2>

    <input
        v-model="mail.to"
        placeholder="Destinataire"
        class="w-full border p-2 rounded"
        type="email"
        autocomplete="off"
    />
    <input
        v-model="mail.subject"
        placeholder="Sujet"
        class="w-full border p-2 rounded"
        type="text"
    />
    <textarea
        v-model="mail.body"
        placeholder="Message..."
        rows="10"
        class="w-full border p-2 rounded"
    ></textarea>

    <button
        :disabled="!isValid"
        @click="sendMail"
        class="bg-[#4A919E] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Envoyer
    </button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import router from "../router.js";
import {computed, reactive} from "vue";

const store = useStore()
const mail = reactive({
  to: '',
  subject: '',
  body: '',
})

function sendMail() {
  if (!isValid.value) return

  const newMail = {
    id: Date.now(),
    sender: store.state.user?.email || 'me@example.com',
    subject: mail.subject,
    content: mail.body,
    date: new Date().toISOString().slice(0, 10),
  }

  store.commit('addMail', newMail)
  router.push('/mails')
}

const isValid = computed(() => {
  return mail.to && mail.subject && mail.body
})

</script>