<template>
  <div class="alert alert-primary" role="alert"><font-awesome-icon :icon="['fas', 'person-digging']" class="me-2" />Download capabilities are in implementation phase. Stay tuned for updates.</div>
  
  <storage-filter :locations="locations" v-on:filter="filter($event)"></storage-filter>
  
  <div class="chart">
    <timeline-by-day-chart v-if="currentFilter && timelineData" :from="currentFilter.from" :to="currentFilter.to" :timelineData="timelineData"></timeline-by-day-chart>
  </div>
</template>

<script setup>
import StorageFilter from '@/components/StorageFilter.vue'
import LocationsRepository from '@/repositories/LocationsRepository'
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import TimelineByDayChart from '@/components/charts/TimelineByDayChart.vue'
import * as _ from 'lodash-es'
import { DateTime } from 'luxon'
import { fillMissing } from '@/utils/Date'
</script>

<script>
export default {
  components: {},
  data: () => {
    return {
      locations: [],
      currentFilter: undefined,
      timelineData: []
    }
  },
  mounted: function () {
    new LocationsRepository().getAll().then((response) => {
      this.locations = _.sortBy(response, ['country', 'name'])
    })
  },
  watch: {
    currentFilter: function () {
      if (this.currentFilter && this.currentFilter.devices.length > 0) {
        new TimelineRepository().getTimeline(TimelineResolution.DAY, _.map(this.currentFilter.devices, '_id'), this.currentFilter.from, this.currentFilter.to).then((response) => {
          let data = _.map(response, (tld) => {
            return {
              date: DateTime.fromISO(tld.date, { zone: 'utc', setZone: true }),
              size: tld.size,
              count: tld.count
            }
          })

          fillMissing(data, 'date', this.currentFilter.from, this.currentFilter.to, 'day')
          
          this.timelineData = data
        })
      } else {
        this.timelineData = []
      }
    }
  },
  methods: {
    filter(e) {
      this.currentFilter = e
    }
  }
}
</script>

<style scoped>
.chart {
  height: 20vh;
  width: 100%;
}
</style>