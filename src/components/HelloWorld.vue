

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

  <button-sign-in-microsoft />


</template>

<script setup>
import {computed, ref} from 'vue'
import ButtonSignInMicrosoft from "./buttons/ButtonSignInMicrosoft.vue";
import {useStore} from "vuex";

defineProps({
  msg: String,
})
const count = ref(0)

const store = useStore()
const user = computed (() => store.getters.user)
</script>



<style scoped>
.read-the-docs {
  color: #888;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>