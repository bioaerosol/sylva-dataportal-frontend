<template>
  <div class="device">
    <div class="d-flex justify-content-between">
      <span>{{ device._id }}</span>
      <span>
        <device-type-badge :device="device" />
        <span class="ms-2"><device-data-availability-info :device="device" :showOnlineOffline="true" :showDataAvailability="false" /></span>
      </span>
    </div>
    <div class="mt-3">
      <div class="subheader">Data Availability</div>
      <div class="subtext">
        <device-data-availability-info :device="device" :showOnlineOffline="false" :showDataAvailability="true" />
      </div>
    </div>
    <div class="mt-3">
      <div class="subheader">Level-0 Data Size</div>
      <div class="subtext">
        <b>Total</b>: {{ totalSize }}
        <storage-by-month-chart class="mt-2" :timelineData="timelineData" />
      </div>
      <div class="mt-3">
        <router-link :to="{ name: 'device', params: { deviceId: device._id }}" custom v-slot="{ navigate }">
          <button class="btn btn-outline-secondary btn-sm w-100" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'chart-line']" class="me-2"/> Device Storage Details</button>
        </router-link>
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
      const data = _.map(response, (tld) => {
          return {
            date: DateTime.fromISO(tld.date),
            size: tld.size
          }
        })

      fillMissing(data, "date", DateTime.fromISO(import.meta.env.VITE_TIMELINE_DATA_START), DateTime.now(), "month")
      this.timelineData = data
    })
  },
  computed: {
    totalSize: function () {
      return formatGiBs(bytesToGibs(this.timelineData.reduce((acc, tld) => acc + tld.size, 0)))
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
</style>

<script setup>
import { DateTime } from 'luxon'
import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
import StorageByMonthChart from '@/components/charts/StorageByMonthChart.vue'
import { bytesToGibs } from '@/utils/Converter'
import { formatGiBs } from '@/utils/Fomatter'
import { fillMissing } from '@/utils/Date'
import * as _ from 'lodash-es'
import DeviceTypeBadge from '@/components/device/DeviceTypeBadge.vue'
import DeviceDataAvailabilityInfo from '@/components/device/DeviceDataAvailabilityInfo.vue'
</script>
