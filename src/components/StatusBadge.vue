<template>
  <span v-if="status == 'SUCCESS'" class="status badge bg-success">Success</span>
  <span v-else-if="status == 'FAILURE'" class="status badge bg-danger">Failure</span>
  <span v-else class="status badge bg-warning">{{ status }}</span>
</template>

<script>
export default {
  props: {
    status: String
  }
}
</script>

<style scoped>
.status {
  align-self: start;
}
</style>
