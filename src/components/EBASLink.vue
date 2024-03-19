<template>
  <a v-if="ebasCode" :href="`https://ebas-data.nilu.no/DataSets.aspx?stations=${ebasCode}&InstrumentTypes=pollen_monitor&fromDate=${fromISO}&toDate=${toISO}`" target="_blank">
    <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class="me-2" />Open Level-1 data in EBAS Database
  </a>
  <span v-else>
    <font-awesome-icon :icon="['fas', 'circle-info']"  class="me-2"/>No Level-1 data available.
    </span>
</template>

<script setup>
import { DateTime } from 'luxon'
</script>

<script>
export default {
  props: {
    ebasCode: {
      type: String,
      required: false
    },
    from: { 
        type: DateTime, 
        default: DateTime.fromISO('2023-01-01') 
    },
    to: { 
        type: DateTime, 
        default: DateTime.now() 
    }
  },
  computed: {
    fromISO() {
      return this.from.toISODate('yyyy-MM-dd')
    },
    toISO() {
      return this.to.toISODate('yyyy-MM-dd')
    }
  }
}
</script>

<style scoped lang="scss">
span {
    color: var(--bs-secondary) !important;
}

a {
  color: var(--bs-secondary) !important;
  
  &:hover {
    color: var(--bs-primary) !important;
  }
}
</style>


