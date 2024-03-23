<template>
  <div class="text-center w-100">
    <doughnut :data="chartData" :options="options" :plugins="plugins" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import * as _ from 'lodash-es'
import ChartJSPluginDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Legend)

export default {
  components: {
    doughnut: Doughnut
  },
  props: {
    locationData: {
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
              return value.typeCount
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        parsing: {
          key: 'typeCount'
        }
      }
    }
  },
  computed: {
    chartData: function () {
      let inputDevices = _.reduce(
        this.locationData,
        (acc, l) => {
          return acc.concat(l.devices)
        },
        []
      )
      inputDevices = _.groupBy(inputDevices, 'type')
      inputDevices = _.map(inputDevices, (v, k) => {
        return {
          type: k,
          typeCount: v.length,
          fileCount: _.sumBy(v, 'totalFileCount'),
          totalSize: _.sumBy(v, 'totalFileSize')
        }
      })
      _.sortBy(inputDevices, 'type')

      return {
        labels: _.map(inputDevices, 'type'),
        datasets: [
          {
            backgroundColor: ['rgb(123, 0, 130)', 'rgb(174, 111, 2)'],
            data: inputDevices
          }
        ]
      }
    }
  }
}
</script>
