<template>
  <div class="device">
    <div class="d-flex justify-content-between">
      <span>{{ device._id }}</span>
      <span>
        <span class="badge rounded-pill text-bg-secondary" :class="device.type">{{ device.type }}</span>
        <span class="ms-2">
          <span v-if="hoursAgo(device) < 24" class="badge rounded-pill text-bg-success">online</span>
          <span v-else class="badge rounded-pill text-bg-danger">offline</span>
        </span>
      </span>
    </div>
    <div class="mt-3">
      <div class="subheader">Data Availability</div>
      <div class="subtext">
        <font-awesome-icon :icon="['far', 'calendar-days']" class="me-1" /> {{ DateTime.fromISO(device.dataStart).setLocale('en-gb').toLocaleString() }} &ndash; {{ DateTime.fromISO(device.dataEnd).setLocale('en-gb').toLocaleString() }}
        <br />
        <span> Last data received {{ Math.floor(hoursAgo(device)) }} hours and {{ Math.round((hoursAgo(device) % 1) * 60) }} minutes ago. </span>
      </div>
    </div>
    <div class="mt-3">
      <div class="subheader">Level-0 Data Size</div>
      <div class="subtext">
        <b>Total</b>: {{ totalSize }}
        <storage-by-month-chart class="mt-2" :timelineData="timelineData" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'storage-by-month-chart': StorageByMonthChart
  },
  props: {
    device: Object
  },
  data: () => ({
    timelineData: []
  }),
  mounted: function () {
    new TimelineRepository().getTimeline(TimelineResolution.MONTH, this.device._id).then((response) => {
      this.timelineData = response
    })
  },
  computed: {
    totalSize: function () {
      return formatGiBs(bytesToGibs(this.timelineData.reduce((acc, tld) => acc + tld.size, 0)))
    }
  },
  methods: {
    hoursAgo: function (device) {
      const now = DateTime.now()
      const dataEnd = DateTime.fromISO(device.dataEnd)
      return now.diff(dataEnd, 'hours').hours
    }
  }
}
</script>

<style scoped lang="scss">
.device {
  background-color: var(--bs-light);
  padding: 0.5em;
}

div.subheader {
  font-size: 0.9em;
  font-weight: bold;
  color: var(--bs-secondary);
  margin-bottom: 0.5em;
  margin-top: 1em;
}

div.subtext {
  font-size: 0.9em;
  color: var(--bs-secondary);
  margin-left: 1em;
}

.badge {
  &.BAA500 {
    background-color: purple !important;
  }
  &.Poleno {
    background-color: rgb(174, 111, 2) !important;
  }
}
</style>

<script setup>
import { DateTime } from 'luxon'
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import StorageByMonthChart from '@/components/charts/StorageByMonthChart.vue'
import { bytesToGibs } from '@/utils/Converter'
import { formatGiBs } from '@/utils/Fomatter'
</script>
