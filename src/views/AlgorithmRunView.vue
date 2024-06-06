<template>
  <h1>Algorithms</h1>
  <h2 class="d-flex justify-content-between" v-if="runOrder && run">
    <span>{{ runOrder.algorithm }}</span>
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

  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="log-tab" data-bs-toggle="tab" data-bs-target="#log" type="button" role="tab" aria-controls="log" aria-selected="true">
        <font-awesome-icon :icon="['fas', 'terminal']" class="me-2" />Log
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="files-tab" data-bs-toggle="tab" data-bs-target="#files" type="button" role="tab" aria-controls="files" aria-selected="false">
        <font-awesome-icon :icon="['fas', 'folder']" class="me-2" />Output Files
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="concentration-tab" data-bs-toggle="tab" data-bs-target="#concentration" type="button" role="tab" aria-controls="concentration" aria-selected="false">
        <font-awesome-icon :icon="['fas', 'table-list']" class="me-2" />Output Concentrations
      </button>
    </li>
  </ul>

  <div class="tab-content" id="myTabContent">
    <div class="tab-pane show active" id="log" role="tabpanel" aria-labelledby="log-tab">
      <algorithm-log :sections="run.sections" />
    </div>
    <div class="tab-pane" id="files" role="tabpanel" aria-labelledby="files-tab">
      <algorithm-output-files :runOrderId="runOrderId" :runId="runId" :outputFiles="run.outputFiles" />
    </div>
    <div class="tab-pane" id="concentration" role="tabpanel" aria-labelledby="concentration-tab">
      <algorithm-output-concentrations :runOrderId="runOrderId" :runId="runId" :outputFiles="run.outputFiles" />
    </div>
  </div>
  
</template>

<script setup>
import StatusBadge from '@/components/StatusBadge.vue'
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository'
import AlgorithmLog from '@/components/algorithm/run/AlgorithmLog.vue'
import AlgorithmOutputFiles from '@/components/algorithm/run/AlgorithmOutputFiles.vue'
import AlgorithmOutputConcentrations from '@/components/algorithm/run/AlgorithmOutputConcentrations.vue'
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

<style scoped>
.tab-pane {
  padding: 10px;
  margin-top: 2em;
}
</style>