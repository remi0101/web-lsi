<template>
  <div class="layout">
    <BaseHeader />
    <main>
      <slot />
      <router-view />
    </main>
  </div>
</template>

<script setup>
import BaseHeader from "./BaseHeader.vue";
</script>
