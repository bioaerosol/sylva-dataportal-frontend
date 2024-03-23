<template>
  <div class="text-center">
    <doughnut :data="chartData" :options="options" :plugins="plugins" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import * as _ from 'lodash-es'
import ChartJSPluginDataLabels from 'chartjs-plugin-datalabels'
import { bytesToTibs } from '@/utils/Converter'

ChartJS.register(ArcElement, Legend)

export default {
  components: {
    doughnut: Doughnut
  },
  props: {
    timelineData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      plugins: [ChartJSPluginDataLabels],
      options: {
        plugins: {
          datalabels: {
            color: '#ffffff',
            font: {
              weight: 'bold'
            },
            formatter: function (value) {
              return bytesToTibs(value.size, true) + ' TiB'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        parsing: {
          key: 'size'
        }
      }
    }
  },
  computed: {
    chartData: function () {
      const inputTimeline = _.sortBy(this.timelineData, 'date')

      return {
        labels: _.map(inputTimeline, 'date'),
        datasets: [
          {
            backgroundColor: ['#35a885', '#e3016d', '#9f8300', '#2875c2', '#90459b'],
            data: _.map(inputTimeline, (t) => {
              return {
                id: t.date,
                count: t.count,
                size: t.size
              }
            })
          }
        ]
      }
    }
  }
}
</script>
