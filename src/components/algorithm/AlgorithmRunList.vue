<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="run in runs" :key="run._id">
          <td>{{ formatDateTime(run.start) }}</td>
          <td>{{ formatDateTime(run.end) }}</td>
          <td class="text-end">
            <status-badge :status="run.status" />
          </td>
          <td>
            <router-link :to="{ name: 'algorithmRun', params: { runOrderId: runOrderId, runId: run._id } }" class="loglink">Show Logs</router-link>
          </td>
          <td>
            Show Results
            <!--<router-link :to="{ name: 'dashboard', params: { id: run._id } }" class="loglink">Show Results</router-link>-->
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
.loglink {
    text-decoration: none;
}
</style>