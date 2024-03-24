<template>
  <div v-if="location && device" class="card mt-4 header">
    <div class="row card-body">
      <div class="col-12">
        <h5 class="card-title d-flex justify-content-between">
          <location-title :location="location" />
          {{ device._id }}
        </h5>
        <div class="card-text text-center mt-3">
          <div><device-type-badge :device="device" class="me-2" /><device-data-availability-info :device="device" :showOnlineOffline="true" :showDataAvailability="false" /></div>
          <div class="mt-3"><device-data-availability-info :device="device" :showOnlineOffline="false" :showDataAvailability="true" /></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="timelineData" class="card mt-4">
    <div class="row card-body">
      <div class="col-12">
        <h5 class="card-title">Level-0 Data Storage</h5>
        <div class="text-center">
          <div class="btn-group w-50" role="group" aria-label="Basic radio toggle button group">
            <label class="btn btn-outline-dark btn-sm" for="displayChartHeatMap" :class="{ active: displayChart == DISPLAY_CHART.HEATMAP }">
              <input type="radio" class="btn-check" name="btnradio" id="displayChartHeatMap" autocomplete="off" :value="DISPLAY_CHART.HEATMAP" v-model="displayChart" />
              <font-awesome-icon :icon="['fas', 'fire']" class="me-2" />Heat Map
            </label>

            <label class="btn btn-outline-dark btn-sm" for="displayChartTimeline" :class="{ active: displayChart == DISPLAY_CHART.TIMELINE }">
              <input type="radio" class="btn-check" name="btnradio" id="displayChartTimeline" autocomplete="off" :value="DISPLAY_CHART.TIMELINE" v-model="displayChart" />
              <font-awesome-icon :icon="['fas', 'chart-line']" class="me-2" />Timeline
            </label>
          </div>
        </div>
        <div v-if="displayChart == DISPLAY_CHART.TIMELINE" class="mt-5">
          <h6>Timeline</h6>
          <timeline-by-day-chart :timelineData="timelineDataWMissing"></timeline-by-day-chart>
        </div>
        <div v-if="displayChart == DISPLAY_CHART.HEATMAP" class="mt-5">
          <h6>Heat Map</h6>
          <heat-map :timelineData="timelineData" />
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12 d-flex justify-content-between">
      <router-link :to="{ name: 'locations' }" custom v-slot="{ navigate }">
        <button class="btn btn-outline-secondary btn-sm" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'backward']" class="me-2" /> Location Overview</button>
      </router-link>

      <router-link :to="{ name: 'download', query: { devices: deviceId } }" custom v-slot="{ navigate }">
        <button class="btn btn-primary btn-sm" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'download']" class="me-2" /> Download Data</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import LocationsRepository from '@/repositories/LocationsRepository'
import _ from 'lodash'
import LocationTitle from '@/components/location/LocationTitle.vue'
import DeviceTypeBadge from '@/components/device/DeviceTypeBadge.vue'
import DeviceDataAvailabilityInfo from '@/components/device/DeviceDataAvailabilityInfo.vue'
import HeatMap from '@/components/charts/HeatMap.vue'
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import TimelineByDayChart from '@/components/charts/TimelineByDayChart.vue'
import { fillMissing } from '@/utils/Date'
import { DateTime } from 'luxon'
</script>

<script>
const DISPLAY_CHART = {
  TIMELINE: 'timeline',
  HEATMAP: 'heatmap'
}

export default {
  components: {},
  props: {
    deviceId: null
  },
  data: () => {
    return {
      location: null,
      device: null,
      timelineData: null,
      displayChart: DISPLAY_CHART.HEATMAP
    }
  },
  computed: {
    timelineDataWMissing: function () {
      let data = _.map(this.timelineData, (tld) => {
        return {
          date: DateTime.fromISO(tld.date, { zone: 'utc', setZone: true }),
          size: tld.size,
          count: tld.count
        }
      })

      data = _.sortBy(data, 'date')
      if (data.length > 0) {
        fillMissing(data, 'date', data[0].date, data[data.length - 1].date, 'day')
        data = _.sortBy(data, 'date')
      }

      return data
    }
  },
  watch: {
    deviceId: {
      handler() {
        if (this.deviceId) {
          new LocationsRepository().getAll().then((response) => {
            this.location = _.find(response, (r) => {
              return _.find(r.devices, (d) => {
                return d._id === this.deviceId
              })
            })

            this.device = _.find(this.location.devices, (d) => {
              return d._id === this.deviceId
            })

            new TimelineRepository().getTimeline(TimelineResolution.DAY, this.deviceId).then((response) => {
              this.timelineData = response
            })
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.card.header {
  background-color: var(--bs-light);
}
</style>
