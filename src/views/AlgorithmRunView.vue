<template>
  <h1>Algorithms</h1>
  <h2 class="d-flex justify-content-between" v-if="runOrder && run">
    <span>Log of {{ runOrder.algorithm }}</span>
    <span><status-badge :status="run.status" /></span>
  </h2>
  <p v-if="runOrder">
    <table class="table">
      <tbody>
      <tr>
        <th>Algorithm Version</th>
        <td>{{ runOrder.algorithmVersion }}</td>
      </tr>
      <tr>
        <th>Dataset</th>
        <td>{{ runOrder.dataset }}</td>
      </tr>
      <tr>
        <th>Run</th>
        <td>{{ formatSectionTimestamp(run.start) }} - {{ formatSectionTimestamp(run.end) }}</td>
      </tr>
      </tbody>
    </table>
  </p>

  <algorithm-log :sections="run.sections" />

  <router-link :to="{ name: 'algorithms' }" custom v-slot="{ navigate }">
    <button class="btn btn-outline-secondary btn-sm mt-5" @click="navigate" @keypress.enter="navigate" role="link"><font-awesome-icon :icon="['fas', 'backward']" class="me-2" /> All Algorithms</button>
  </router-link>
</template>

<script setup>
import StatusBadge from '@/components/StatusBadge.vue'
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository'
import AlgorithmLog from '@/components/algorithm/AlgorithmLog.vue'
import _ from 'lodash-es'
import { DateTime } from 'luxon'
</script>

<script>
export default {
  props: {
    runOrderId: String,
    runId: String
  },
  data: () => ({
    runOrder: null,
    run: {}
  }),
  mounted: function () {
    new AlgorithmRepository().getRun(this.runOrderId, this.runId).then((response) => {
      this.run = response
    })
    new AlgorithmRepository().getRunOrders().then((response) => {
      this.runOrder = _.find(response, (x) => x._id == this.runOrderId)
    })
  },
  methods: {
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
