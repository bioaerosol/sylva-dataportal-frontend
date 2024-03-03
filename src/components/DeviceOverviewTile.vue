<template>
  <div class="device">
    {{ device._id }}
    <div class="mt-2">
      <span class="badge rounded-pill text-bg-secondary">{{ device.type }}</span>
      <span class="ms-2">
        <span v-if="hoursAgo(device) < 24" class="badge rounded-pill text-bg-success">online</span>
        <span v-else class="badge rounded-pill text-bg-danger">offline</span>
      </span>
    </div>
    <div class="mt-2"><font-awesome-icon :icon="['far', 'calendar-days']" class="me-1" /> {{ DateTime.fromISO(device.dataStart).setLocale('en-gb').toLocaleString() }} &ndash; {{ DateTime.fromISO(device.dataEnd).setLocale('en-gb').toLocaleString() }}</div>
  </div>
</template>

<script>
export default {
  props: {
    device: Object
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

<style scoped>
.device {
  background-color: var(--bs-light);
  padding: .5em;
}
</style>

<script setup>
import { DateTime } from 'luxon'
</script>
