<template>
  <div class="console">
    <div class="section d-flex justify-content-between" :id="sectionKey">
      <span>
        {{ SECTION_NAMES[sectionKey] || sectionKey }}
        <span class="duration">({{ formatSectionTimestamp(sectionContent.start) }} → {{ formatSectionTimestamp(sectionContent.end) }})</span>
      </span>
      <status-badge :status="sectionContent.status" />
    </div>
    <div v-for="(log, index) in sectionContent.log" :key="log" class="d-flex">
      <span class="timestamp" :class="{ duplicate: index > 0 && log.timestamp == sectionContent.log[index - 1].timestamp }">{{ formatConsoleTimestamp(log.timestamp) }}</span>
      <span class="log">{{ log.output }}</span>
    </div>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'
import StatusBadge from '@/components/StatusBadge.vue'

const SECTION_NAMES = {
  ORDER_DATA: 'Ordering Level-0 Data',
  CLONE: 'Cloning Algorithm Repository',
  BUILD_ALGORITHM_IMAGE: 'Building Algorithm Image',
  BUILD_ALGORITHM_RUN_IMAGE: 'Building Image to Run Algorithm',
  WAIT_FOR_DATA: 'Waiting for Requested Data',
  START_ALGORITHM: 'Starting the Algorithm',
  RUN_ALGORITHM: 'Running the Algorithm',
  WAIT_FOR_ALGORITHM: 'Waiting for the Algorithm to Complete',
  COPY_OUTPUT: 'Copying Output',
  CLEANUP: 'Cleaning Up'
}
</script>

<script>
export default {
  props: {
    sectionKey: String,
    sectionContent: Object
  },
  data: function () {
    return {
      lastPrintedTimestamp: 0
    }
  },
  computed: {
    panelId: function () {
      return 'panelsStayOpen-' + this.sectionKey
    },
    panelHeaderId: function () {
      return 'panelsStayOpen-heading-' + this.sectionKey
    }
  },
  methods: {
    formatConsoleTimestamp: function (dt) {
      return DateTime.fromMillis(dt * 1000)
        .setLocale(import.meta.env.VITE_LOCALE)
        .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    },
    formatSectionTimestamp: function (dt) {
      if (!dt) {
        return ''
      } else {
        return DateTime.fromMillis(dt * 1000)
          .setLocale(import.meta.env.VITE_LOCALE)
          .toLocaleString(DateTime.DATETIME_MED)
      }
    }
  }
}
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  background-color: unset;
}

.accordion-button.collapsed {
  color: var(--bs-secondary);
}

.console {
  font-family: monospace;
  background-color: #292c34;
  color: #fff;
  padding: 10px;

  .section {
    background-color: #ffffff22;
    padding: 5px;
    font-weight: 600;
    margin-top: 1em;
    margin-bottom: 0.5em;

    .duration {
      font-size: 0.8em;
      color: #666;
    }
  }
}

.timestamp {
  margin-right: 1.5em;
  display: inline-block;

  &.duplicate {
    color: #666;
  }
}
</style>
