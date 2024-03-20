<template>
  <div class="card mt-4">
    <div class="row card-body">
      <div class="col-12">
        <storage-filter :locations="locations" v-on:filter="filter($event)"></storage-filter>
      </div>
    </div>
  </div>
  
  <loading-widget :isLoading="loading" class="mt-4" />
  
  <div class="card mt-4" v-if="!loading && validFilter && (fileCount === 0 || timelineData.length > 2)">
    <div class="row card-body">
      <div class="col-12">
        <div v-if="fileCount === 0" class="alert alert-warning mt-5" role="alert"><font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="me-2" />No data available for the selected filter.</div>
        <div v-else-if="timelineData.length > 2" class="chart mt-5 mb-3">
          <timeline-by-day-chart v-if="currentFilter && timelineData" :from="currentFilter.from" :to="currentFilter.to" :timelineData="timelineData"></timeline-by-day-chart>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-12 mt-4" v-if="validFilter && fileCount > 0">
    <form>
      <div class="row">
        <div class="col-12 col-lg-6 mb-3">
          <input type="password" id="tokenInput" class="form-control" placeholder="Enter token" required v-model="downloadToken" />
          <div class="form-text">The public download of data is currently not supported. Please enter a valid token to download the data.</div>
        </div>
        <div class="col-12 col-lg-6">
          <button class="btn btn-primary w-100" v-on:click="download($event)" :disabled="loading || !downloadToken || downloadToken.length === 0">Download {{ fileCount }} files with total of {{ bytesToGibs(totalSize, true) }} GiBs</button>
        </div>
      </div>
    </form>
  </div>

  <div v-if="downloadError" class="alert alert-danger mt-4" role="alert"><font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="me-2" />Download could not be started. Please check your token.</div>
</template>

<script setup>
import StorageFilter from '@/components/StorageFilter.vue'
import LocationsRepository from '@/repositories/LocationsRepository'
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import TimelineByDayChart from '@/components/charts/TimelineByDayChart.vue'
import * as _ from 'lodash-es'
import { DateTime } from 'luxon'
import { fillMissing } from '@/utils/Date'
import { bytesToGibs } from '@/utils/Converter'
import LoadingWidget from '@/components/utils/LoadingWidget.vue'
import {WorkspaceRepository} from '@/repositories/WorkspaceRepository'
</script>

<script>
export default {
  components: {},
  data: () => {
    return {
      locations: [],
      currentFilter: undefined,
      timelineData: [],
      fileCount: 0,
      totalSize: 0,
      loading: false,
      downloadToken: null,
      downloadError: false
    }
  },
  mounted: function () {
    new LocationsRepository().getAll().then((response) => {
      this.locations = _.sortBy(response, ['country', 'name'])
    })
  },
  computed: {
    validFilter() {
      return this.currentFilter && this.currentFilter.devices.length > 0 && this.currentFilter.from && this.currentFilter.to
    }
  },
  watch: {
    currentFilter: function () {
      this.downloadError = false
      
      if (this.currentFilter && this.currentFilter.devices.length > 0) {
        this.loading = true
        new TimelineRepository()
          .getTimeline(TimelineResolution.DAY, _.map(this.currentFilter.devices, '_id'), this.currentFilter.from, this.currentFilter.to)
          .then((response) => {
            this.fileCount = _.sumBy(response, 'count')
            this.totalSize = _.sumBy(response, 'size')

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
          .always(() => (this.loading = false))
      } else {
        this.timelineData = []
        this.fileCount = 0
        this.totalSize = 0
      }
    }
  },
  methods: {
    filter(e) {
      this.currentFilter = e
    },
    download: function (event) {
      event.preventDefault()
      event.stopPropagation()
      
      if (this.validFilter && this.fileCount > 0) {
        this.loading = true
        new WorkspaceRepository().requestWorkspace(_.map(this.currentFilter.devices, '_id'), this.currentFilter.from, this.currentFilter.to, this.downloadToken).then((response) => {
          if (response && response.id) {
            this.$router.push({ name: 'workspace', params: { workspaceId: response.id } })
          }
        }).catch(() => {
          this.downloadError = true
        }).always(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>
.chart {
  max-height: 20vh;
  width: 100%;
}
</style>
