<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <li v-for="(runOrders, name) in algorithms" :key="runOrders._id" class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 w-100">
            <div class="fw-bold">Algorithm: {{ name }}</div>

            <table class="table w-100 mt-4">
              <thead>
                <tr>
                  <th>Repository</th>
                  <th>Version</th>
                  <th>Dataset</th>
                  <th>Runs</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="runOrder in runOrders" :key="runOrder._id">
                  <td>{{ runOrder.algorithmRepository }}</td>
                  <td>{{ runOrder.algorithmVersion }}</td>
                  <td>{{ runOrder.dataset }}</td>
                  <td>
                    <algorithm-run-list :runOrderId="runOrder._id" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <span class="badge bg-primary rounded-pill">{{ runOrders.length }} Version{{ runOrders.length > 1 ? 's' : '' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import AlgorithmRunList from '@/components/algorithm/AlgorithmRunList.vue'
</script>

<script>
import _ from 'lodash-es'

export default {
  props: {
    runOrders: Object
  },
  computed: {
    algorithms: function () {
      return _.groupBy(this.runOrders, 'algorithm')
    }
  }
}
</script>

<style scoped>
th {
    font-weight: bold !important;
}
</style>