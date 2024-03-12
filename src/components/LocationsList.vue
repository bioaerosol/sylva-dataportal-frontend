<template>
  <div class="row">
    <loading-widget :isLoading="locations.length === 0" />
    <div v-for="location in locations" :key="location.code" class="col-12 col-md-6 col-lg-4 mt-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title d-flex align-items-center"><img :src="flagUrls[location.country]" class="flag me-2" />{{ location.name }}</h5>
          <ebas-link :ebasCode="location.ebasCode" />
          <div class="card-text">
            <div v-for="device in location.devices" :key="device.id" class="mt-4">
              <device-tile :device="device" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "ebas-link": EBASLink
  },
  props: {
    locations: Array
  }
}
</script>

<style scoped>
.flag {
  height: 1em;
  border: 1px solid var(--bs-secondary);
}
</style>

<script setup>
import DeviceTile from '@/components/device/DeviceTile.vue'
import LoadingWidget from '@/components/utils/LoadingWidget.vue'
import EBASLink from '@/components/EBASLink.vue'

const flagUrls = {
  DE: new URL('../assets/flags/DE.png', import.meta.url).href,
  ES: new URL('../assets/flags/ES.png', import.meta.url).href,
  FI: new URL('../assets/flags/FI.png', import.meta.url).href
}
</script>
