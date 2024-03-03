<template>
  <div class="row">
    <div v-for="location in locations" :key="location.code" class="col-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title d-flex align-items-center"><img :src="flagUrls[location.country]" class="flag me-2" />{{ location.name }}</h5>
          <div class="card-text">
            <h6>Devices</h6>
            <div v-for="device in location.devices" :key="device.id">
              <device-overview-tile :device="device" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    locations: Array
  }
}
</script>

<style scoped>
.flag {
  height: 2em;
}
</style>

<script setup>
import DeviceOverviewTile from '@/components/DeviceOverviewTile.vue'

const flagUrls = {
  DE: new URL('../assets/flags/DE.png', import.meta.url).href,
  ES: new URL('../assets/flags/ES.png', import.meta.url).href,
  FI: new URL('../assets/flags/FI.png', import.meta.url).href
}
</script>
