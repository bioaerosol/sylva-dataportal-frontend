<template>
  <div v-if="location && device" class="card mt-4">
    <div class="row card-body">
      <div class="col-12">
        <h5 class="card-title d-flex justify-content-between">
          <location-title :location="location" />
          {{ device._id }}
          <device-type-badge :device="device" />
        </h5>
        <div class="card-text text-center mt-3">
          <div><device-data-availability-info :device="device" :showOnlineOffline="true" :showDataAvailability="false" /></div>
          <div class="mt-3"><device-data-availability-info :device="device" :showOnlineOffline="false" :showDataAvailability="true" /></div>
        </div>
        <div class="mt-5">
          <h6>Level-0 Data Timeline</h6>
          <timeline-by-day-chart :timelineData="timelineDataWMissing"></timeline-by-day-chart>
        </div>
        <div class="mt-5">
          <h6>Level-0 Data Heat Map</h6>
          <heat-map v-if="timelineData" :timelineData="timelineData" />
        </div>
      </div>
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
export default {
  components: {},
  props: {
    deviceId: null
  },
  data: () => {
    return {
      location: null,
      device: null,
      timelineData: null
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
