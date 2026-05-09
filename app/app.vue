<template>
  <div>
    <Preloader v-if="showPreloader" @complete="onPreloaderDone" />
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPreloader = ref(true)

const onPreloaderDone = () => {
  showPreloader.value = false
}
</script>
