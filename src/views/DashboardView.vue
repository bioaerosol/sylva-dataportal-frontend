<template>
  <div class="row">
    <div class="col-12 mb-5">
      <h1>
        The SYLVA IT Infrastructure currently stores <span class="huge">{{ bytesToTibs(totalSize, true) }}</span> terrabytes of data being delivered by <span class="huge">{{ deviceCount }}</span> devices at <span class="huge">{{ locationCount }}</span> locations.
      </h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 mt-3">
      <div class="card me-0 me-md-3 text-center">
        <h2 class="mt-2 mb-3">Terrabytes by Year</h2>

        <total-storage-by-year-doughnut-chart :timelineData="timelineData" class="mb-3" />
        
        <router-link :to="{ name: 'locations' }" custom v-slot="{ navigate }">
          <button class="btn btn-outline-secondary btn-sm m-3" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'map-location-dot']" class="me-2" /> View Data Size Details in Location Overview</button>
        </router-link>
      </div>
    </div>
    <div class="col-12 col-md-6 mt-3 mb-5 text-center">
      <div class="card ms-0 ms-md-3">
        <h2 class="mt-2 mb-3">Devices by Type</h2>
        
        <count-by-device-type-doughnut-chart :locationData="locationData" class="mb-3" />

        <router-link :to="{ name: 'locations' }" custom v-slot="{ navigate }">
          <button class="btn btn-outline-secondary btn-sm m-3" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'map-location-dot']" class="me-2" /> View All Devices in Location Overview</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import TotalStorageByYearDoughnutChart from '@/components/charts/TotalStorageByYearDoughnutChart.vue'
import CountByDeviceTypeDoughnutChart from '@/components/charts/CountByDeviceTypeDoughnutChart.vue'
import LocationsRepository from '@/repositories/LocationsRepository'
import { bytesToTibs } from '@/utils/Converter'
</script>
<script>
export default {
  components: {},
  data: () => ({
    timelineData: [],
    locationData: []
  }),
  computed: {
    totalSize: function () {
      return this.timelineData.reduce((acc, t) => acc + t.size, 0)
    },
    deviceCount: function () {
      return this.locationData.reduce((acc, l) => acc + l.devices.length, 0)
    },
    locationCount: function () {
      return this.locationData.length
    }
  },
  mounted: function () {
    new TimelineRepository().getTimeline(TimelineResolution.YEAR).then((response) => {
      this.timelineData = response
    })
    new LocationsRepository().getAll().then((response) => {
      this.locationData = response
    })
  }
}
</script>

<style scoped>
.huge {
  font-size: 2em;
}
</style>
