<script setup>
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, TimeScale } from 'chart.js'
import { Line } from 'vue-chartjs'
import * as _ from 'lodash-es'
import 'chartjs-adapter-luxon'
import { bytesToGibs } from '@/utils/Converter'
</script>

<template>
  <line-chart :data="chartData" :options="options" />
</template>

<script>
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Filler)

export default {
  components: {
    'line-chart': Line
  },
  props: {
    timelineData: Array
  },
  computed: {
    chartData: function () {
      return {
        datasets: [
          {
            data: _.sortBy(this.timelineData, 'date')
          }
        ]
      }
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        datasets: {
          line: {
            fill: true,
            pointRadius: 0,
            borderColor: 'rgba(180, 248, 0, 1)',
            backgroundColor: 'rgba(180, 248, 0, 0.3)'
          }
        },
        scales: {
          x: {
            ticks: {
              stepSize: 3
            },
            adapters: {
              date: {
                locale: 'en'
              }
            },
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            min: 0,
            ticks: {
              callback: function (value) {
                return (Math.round(bytesToGibs(value) * 100) / 100).toLocaleString(import.meta.env.VITE_LOCALE)
              }
            }
          }
        },
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'size'
        }
      }
    }
  }
}
</script>
