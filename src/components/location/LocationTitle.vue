<template>
  <span class="d-flex align-items-center"> <img :src="flagUrls[location.country]" class="flag me-2" />{{ location.name }} </span>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
span {
    font-weight: inherit;
}
.flag {
  height: 1em;
  border: 1px solid var(--bs-secondary);
}
</style>

<script setup>
const flagUrls = {
  DE: new URL('@/assets/flags/DE.png', import.meta.url).href,
  ES: new URL('@/assets/flags/ES.png', import.meta.url).href,
  FI: new URL('@/assets/flags/FI.png', import.meta.url).href,
  CH: new URL('@/assets/flags/CH.png', import.meta.url).href,
  SE: new URL('@/assets/flags/SE.png', import.meta.url).href
}
</script>
