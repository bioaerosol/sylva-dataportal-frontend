<template>
  <line-chart :data="chartData" :options="options" />
</template>

<script setup>
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, TimeScale } from 'chart.js'
import { Line } from 'vue-chartjs'
import { DateTime } from 'luxon'
import * as _ from 'lodash-es'
import 'chartjs-adapter-luxon'
import { bytesToGibs } from '@/utils/Converter'
</script>

<script>
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Filler)

export default {
  components: {
    'line-chart': Line
  },
  props: {
    timelineData: Array,
    monthlyTimelines: Array
  },
  computed: {
    chartData: function () {
      const sortedData = _.sortBy(
        _.map(this.timelineData, (tld) => {
          return {
            date: DateTime.fromISO(tld.date),
            size: tld.size
          }
        }),
        'date'
      )

      const firstDatasetDate = sortedData.length > 0 ? sortedData[0].date : DateTime.now()

      const monthsToTimelineStart = firstDatasetDate.diff(DateTime.fromISO(import.meta.env.VITE_TIMELINE_DATA_START), 'months').months
      for (let i = 0; i <= monthsToTimelineStart; i++) {
        sortedData.unshift({
          date: firstDatasetDate.minus({ months: i }),
          size: null
        })
      }

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
