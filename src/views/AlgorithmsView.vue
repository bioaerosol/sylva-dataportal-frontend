<template>
  <h1>Algorithms</h1>
  <p></p>
  <algorithm-list :runOrders="algorithms" />
  
</template>

<script setup>
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository'
import AlgorithmList from '@/components/algorithm/AlgorithmList.vue'
</script>
<script>

  export default {
    data: () => ({
      algorithms: []
    }),
    mounted: function() {
      new AlgorithmRepository().getRunOrders().then((response) => {
        this.algorithms = response
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
