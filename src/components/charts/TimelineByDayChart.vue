<script setup>
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, TimeScale } from 'chart.js'
import { Line } from 'vue-chartjs'
import * as _ from 'lodash-es'
import 'chartjs-adapter-luxon'
import { bytesToGibs } from '@/utils/Converter'
</script>

<template>
  <line-chart v-if="dataValid" :data="chartData" :options="options" class="w-100"/>
</template>

<script>
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Filler)

export default {
  components: {
    'line-chart': Line
  },
  props: {
    timelineData: Array,
    
  },
  computed: {
    dataValid: function () {
      return this.timelineData && this.timelineData.length
    },
    chartData: function () {
      const sortedData = _.sortBy(this.timelineData, 'date')

      return {
        datasets: [
          {
            data: _.map(sortedData, (d) => {
              return {
                date: d.date,
                data: d.size
              }
            }),
            order: 1,
            yAxisID: 'ySize',
            fill: true,
            pointRadius: 0,
            borderColor: 'rgba(180, 248, 0, 1)',
            backgroundColor: 'rgba(180, 248, 0, 0.3)'
          },
          {
            data: _.map(sortedData, (d) => {
              return {
                date: d.date,
                data: d.count
              }
            }),
            type: 'line',
            order: 0,
            yAxisID: 'yCount',
            borderColor: 'rgb(217, 16, 115)',
            pointRadius: 0,
            borderWidth: 1
          }
        ]
      }
    }
  },
  data() {
    return {
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        responsive: false,
        maintainAspectRatio: false,
        aspectRatio: 6,
        scales: {
          x: {
            adapters: {
              date: {
                locale: 'en'
              }
            },
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          ySize: {
            min: 0,
            ticks: {
              callback: function (value) {
                return (Math.round(bytesToGibs(value) * 100) / 100).toLocaleString(import.meta.env.VITE_LOCALE)
              }
            },
            title: {
              text: 'Total Size (GiB)',
              display: true,
              color: "rgb(128, 171, 0)"
            },
            grid: {
              display: false
            }
          },
          yCount: {
            min: 0,
            position: 'right',
            title: {
              text: 'File Count',
              display: true,
              color: "rgb(217, 16, 115)"
            },
            grid: {
              display: false
            }
          }
        },
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'data'
        }
      }
    }
  }
}
</script>
