<template>
  <form class="row">
    <div class="col-12 col-md-6">
      <label for="devices" class="form-label">Devices</label>
      <vue-multiselect id="devices" v-if="devices && devices.length > 0" :options="devices" selectLabel="" deselectLabel="" v-model="selectedDevices" :multiple="true" :close-on-select="true" :clear-on-select="false" :searchable="false" placeholder="Select devices" label="_id" track-by="_id" />
    </div>
    <div class="col-12 col-md-6">
      <label for="daterange" class="form-label">Date Range</label><br />
      <date-range-picker id="daterange" v-model="dateRange" ref="picker" singleDatePicker="range" :timePicker="false" :showWeekNumbers="true" :showDropdowns="true" :autoApply="true" :dateRange="dateRange" :linkedCalendars="true"> </date-range-picker>
    </div>
  </form>
</template>

<script setup>
import VueMultiselect from 'vue-multiselect'
import DateRangePicker from 'vue3-daterange-picker'
import '@/assets/vue-multiselect.scss'
import { DateTime } from 'luxon'
import * as _ from 'lodash-es'
</script>

<script>
export default {
  props: {
    locations: {
      type: Array,
      required: false
    }
  },
  data: () => {
    return {
      selectedDevices: [],
      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      }
    }
  },
  computed: {
    devices() {
      return _.flatMap(this.locations, 'devices')
    }
  },
  methods: {
    emitFilters() {
      this.$emit('filter', {
        devices: this.selectedDevices,
        from: DateTime.fromJSDate(this.dateRange.startDate).setZone('utc', { keepLocalTime: true }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        to: DateTime.fromJSDate(this.dateRange.endDate).setZone('utc', { keepLocalTime: true }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).plus({ days: 1 })
      })
    }
  },
  watch: {
    selectedDevices: function () {
      this.emitFilters()
    },
    dateRange: function () {
      this.emitFilters()
    }
  }
}
</script>

<style scoped lang="scss">
.vue-daterange-picker {
  width: 100%;
}
</style>

<style>
.reportrange-text {
  padding: 0.375rem 0.75rem !important;
  border: var(--bs-border-width) solid var(--bs-border-color) !important;
}
</style>
