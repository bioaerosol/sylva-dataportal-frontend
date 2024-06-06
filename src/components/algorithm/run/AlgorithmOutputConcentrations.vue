<template>
    <div class="alert alert-info d-flex" role="alert">
        <font-awesome-icon :icon="['fas', 'info-circle']" class="me-3" />
        This section shows a first overview of pollen concentrations determined by the algorithm. For detailed analysis of results please
        use the output files which may contain more information.
    </div>

    <div v-if="!concentrationsByDevice" class="alert alert-warning" role="alert">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="me-3" />
        No pollen concentrations found. This can be due to the algorithm not having produced any valid output files (yet) or the output files not containing any pollen concentrations.
    </div>

    <div v-for="(concentrations, device) in concentrationsByDevice" :key="device" class="mt-3">
        <b>Device: {{ device }}</b>
        <table class="table table-hover mt-3">
        <thead>
            <th>From</th>
            <th>To</th>
            <th v-for="pollen in allPollenTypes(concentrations)" :key="pollen">{{ pollen }}</th>
        </thead>
        <tbody>
            <tr v-for="concentration in sortByTimestamp(concentrations)" :key="concentration.start">
            <td>{{ formatFullFromEpoch(concentration.start) }}</td>
            <td>{{ formatFullFromEpoch(concentration.end) }}</td>
            <td v-for="pollen in allPollenTypes(concentrations)" :key="pollen">
                {{ _.find(concentration.pollen, { name: pollen })?.concentration }}
            </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script setup>
import _ from 'lodash-es'
import { loadJsons } from '@/utils/AlgorithmOutputConcentrations'
import { formatFullFromEpoch } from '@/utils/Date'
</script>

<script>
export default {
  props: {
    runOrderId: String,
    runId: String,
    outputFiles: Array
  },
  data() {
    return {
      concentrationsByDevice: null
    }
  },
  watch: {
    jsonFiles: {
      handler: function () {
        loadJsons(this.runOrderId, this.runId, this.jsonFiles).then((jsons) => {
          this.concentrationsByDevice = _.groupBy(jsons, (j) => j.device.id)
        })
      },
      deep: true
    }
  },
  computed: {
    jsonFiles: function () {
      return _.filter(this.outputFiles, (file) => file.fileName.endsWith('.json'))
    }
  },
  methods: {
    sortByTimestamp: function (concentrations) {
      return _.sortBy(concentrations, (c) => c.start)
    },
    allPollenTypes: function (concentrations) {
      return _.sortBy(
        _.uniq(
          _.map(
            _.flatMap(concentrations, (c) => c.pollen),
            'name'
          )
        )
      )
    }
  }
}
</script>

<style scoped>
th {
  font-weight: bold;
}
</style>
