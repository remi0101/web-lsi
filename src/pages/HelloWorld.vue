

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <p v-if="user">Connected User : {{ user.name }}</p>

  </div>


</template>

<script setup>
import {computed, ref} from 'vue'
import ButtonSignInMicrosoft from "../components/buttons/ButtonSignInMicrosoft.vue";
import {useStore} from "vuex";

defineProps({
  msg: String,
})
const count = ref(0)

const store = useStore()
const user = computed (() => store.getters.user)
</script>