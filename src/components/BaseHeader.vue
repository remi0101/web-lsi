<template>
  <header class="w-full bg-white border-b border-[#4A919E] px-6 py-6 shadow-md flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <router-link to="/mails" class="text-2xl font-bold text-[#4A919E] tracking-tight">
        MailBox test
      </router-link>
    </div>

    <div class="flex items-center gap-4">
      <template v-if="user">
        <span class="text-sm font-medium text-[#212E53]">
          Bonjour, {{ user.name }}
        </span>
        <LogOutButton />
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import LogOutButton from "./buttons/LogOutButton.vue";

const store = useStore();
const user = computed(() => store.getters.user);
</script>
