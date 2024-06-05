<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="run in runs" :key="run._id">
          <td>{{ formatDateTime(run.start) }}</td>
          <td>{{ formatDateTime(run.end) }}</td>
          <td class="text-end">
            <status-badge :status="run.status" class="status" />
          </td>
          <td class="text-end">
            <router-link :to="{ name: 'algorithmRun', params: { runOrderId: runOrderId, runId: run._id } }" custom v-slot="{ navigate }">
              <button class="btn btn-outline-secondary btn-sm" @click="navigate" @keypress.enter="navigate" role="link">
                <font-awesome-icon :icon="['fas', 'asterisk']" class="me-2" />Open Details
              </button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository'
import StatusBadge from '@/components/StatusBadge.vue'
</script>

<script>
import _ from 'lodash-es'
import { DateTime } from 'luxon'

export default {
  props: {
    runOrderId: String
  },
  data: () => ({
    runs: []
  }),
  mounted: function () {
    new AlgorithmRepository().getRuns(this.runOrderId).then((response) => {
      this.runs = _.sortBy(response, (x) => -1 * x.start)
    })
  },
  computed: {
    algorithms: function () {
      return _.groupBy(this.runOrders, 'algorithm')
    }
  },
  methods: {
    formatDateTime: function (dt) {
      return DateTime.fromMillis(dt * 1000)
        .setLocale(import.meta.env.VITE_LOCALE)
        .toLocaleString(DateTime.DATETIME_MED)
    }
  }
}
</script>

<style scoped> 
.status {
    width: 80px;
}
</style>