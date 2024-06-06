<template>
  <h1>Algorithms</h1>
  <p class="sectionIntro">SYLVA provides an infrastructure to run algorithms on level-0 data. In this section you can see all known algorithms with detailed run information.</p>
  <algorithm-list :runOrders="algorithms" />
</template>

<script setup>
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository'
import AlgorithmList from '@/components/algorithm/AlgorithmList.vue'
import semver from 'semver'
</script>
<script>

  export default {
    data: () => ({
      algorithms: []
    }),
    mounted: function() {
      new AlgorithmRepository().getRunOrders().then((response) => {
        this.algorithms = response.sort((a, b) => {
          
          const va = a.algorithmVersion
          const vb = b.algorithmVersion

          if (semver.gt(va, vb)) {
             return -1;
           } else if (semver.lt(va, vb)) {
             return 1;
           } else {
             return 0;
           }
        })
      })
    }
  }

</script>

<style scoped>
.card-img-top {
  font-size: 5em;
  color: var(--bs-secondary);
  margin: 20px;
  width: unset;
}
</style>
