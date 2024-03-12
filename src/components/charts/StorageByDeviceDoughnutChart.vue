<template>
  <doughnut-chart :data="chartData" :options="options" />
</template>

<script setup>
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, TimeScale } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { DateTime } from 'luxon'
import * as _ from 'lodash-es'
import 'chartjs-adapter-luxon'
import { bytesToGibs } from '@/utils/Converter'
</script>

<script>
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Filler, ArcElement)

export default {
  components: {
    'doughnut-chart': Doughnut
  },
  props: {
    timelineData: Array,
  },
  computed: {
    chartData: function () {
      const sortedData = []
      console.log(this.timelineData)

      return {
        datasets: [
          {
            data: sortedData
          }
        ]
      }
    }
  },
  data() {
    return {
      options: {
        responsive: true
      }
    }
  }
}
</script>
