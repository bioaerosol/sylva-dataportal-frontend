<template>
  <span v-if="showOnlineOffline">
    <span v-if="hoursAgo(device) < 24" class="badge rounded-pill text-bg-success">online</span>
    <span v-else class="badge rounded-pill text-bg-danger">offline</span>
  </span>

  <span v-if="showDataAvailability">
    <font-awesome-icon :icon="['far', 'calendar-days']" class="me-1" /> {{ DateTime.fromISO(device.dataStart).setLocale('en-gb').toLocaleString() }} &ndash; {{ DateTime.fromISO(device.dataEnd).setLocale('en-gb').toLocaleString() }}
    <br />
    <span> Last data received {{ Math.floor(hoursAgo(device)) }} hours and {{ Math.round((hoursAgo(device) % 1) * 60) }} minutes ago. </span>
  </span>
</template>

<script>
export default {
  props: {
    device: Object,
    showOnlineOffline: {
      type: Boolean,
      default: true
    },
    showDataAvailability: {
      type: Boolean,
      default: true
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

<script setup>
import { DateTime } from 'luxon'
</script>
