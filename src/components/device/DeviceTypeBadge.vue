<template>
  <span class="badge rounded-pill text-bg-secondary" :class="device.type">{{ device.type }}</span>
</template>

<script>
export default {
  props: {
    device: Object
  }
}
</script>

<style scoped>
.badge {
  &.BAA500 {
    background-color: purple !important;
  }
  &.Poleno {
    background-color: rgb(174, 111, 2) !important;
  }
}
</style>
