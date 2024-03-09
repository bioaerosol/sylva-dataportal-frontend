<template>
  <div v-if="isLoading"><font-awesome-icon :icon="['far', 'hourglass-half']" /> Loading...</div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  }
}
</script>
