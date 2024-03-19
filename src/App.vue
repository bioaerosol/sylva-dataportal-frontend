<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <NavigationBar />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationBar: NavigationBar
  }
}
</script>
