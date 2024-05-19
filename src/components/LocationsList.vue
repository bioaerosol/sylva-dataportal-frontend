<template>
  <div class="row">
    <loading-widget :isLoading="locations.length === 0" />
    <template v-for="location in locations" :key="location.code">
      <div v-for="device in location.devices" :key="device.id" class="col-12 col-md-6 col-lg-4 mt-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><location-title :location="location" /></h5>
            <ebas-link :ebasCode="location.ebasCode" />
            <div class="card-text">
              <div class="mt-4">
                <device-tile :device="device" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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



<script setup>
import DeviceTile from '@/components/device/DeviceTile.vue'
import LoadingWidget from '@/components/utils/LoadingWidget.vue'
import EBASLink from '@/components/EBASLink.vue'
import LocationTitle from '@/components/location/LocationTitle.vue'
</script>
