<template>
  <Chart v-if="chartInputData" ref="myChart" :options="chartOptions" :data="chartData" class="w-100" />
  <div class="flex d-flex justify-content-between mt-3">
    <button class="btn btn-secondary btn-sm" @click="prev" :disabled="!canPrev"><font-awesome-icon :icon="['fas', 'angles-left']" /></button>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <label class="btn btn-outline-dark btn-sm" for="btnradio2" :class="{ active: content == CONTENT.TOTAL_SIZE }">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" :value="CONTENT.TOTAL_SIZE" v-model="content" />
        Total Size
      </label>

      <label class="btn btn-outline-dark btn-sm" for="btnradio1" :class="{ active: content == CONTENT.FILE_COUNT }">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" :value="CONTENT.FILE_COUNT" v-model="content" />
        File Count
      </label>
    </div>

    <button class="btn btn-secondary btn-sm" @click="next" :disabled="!canNext"><font-awesome-icon :icon="['fas', 'angles-right']" /></button>
  </div>
</template>

<script>
const CONTENT = {
  FILE_COUNT: 'fileCount',
  TOTAL_SIZE: 'totalSize'
}

const DISPLAY_WEEK_COUNT = 42
const MatrixChart = createTypedChart('matrix', MatrixController)

export default {
  props: {
    timelineData: {
      type: Object,
      required: true
    }
  },
  components: {
    Chart: MatrixChart
  },
  data() {
    return {
      chartOptions: {
        animation: false,
        plugins: {
          legend: false,
          tooltip: {
            displayColors: false,
            callbacks: {
              title(context) {
                const data = context[0].dataset.data[context[0].dataIndex]
                return data.d.setLocale(import.meta.env.VITE_LOCALE).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
              },
              label(context) {
                const v = context.dataset.data[context.dataIndex]
                return ['File Count: ' + v.fileCount, 'Total Size: ' + bytesToGibs(v.totalSize, true) + ' GiB']
              }
            }
          }
        },
        responsive: true,
        aspectRatio: 6,
        keepAspectRatio: true,
        scales: {
          y: {
            offset: true,
            reverse: true,
            position: 'right',
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              padding: 5,
              font: {
                size: 9
              },
              callback: function (value) {
                const date = DateTime.fromObject({ weekday: value })
                return date.setLocale(import.meta.env.VITE_LOCALE).weekdayShort
              }
            },
            grid: {
              display: false,
              drawBorder: false,
              tickLength: 0
            }
          },
          x: {
            type: 'time',
            position: 'bottom',
            offset: true,
            time: {
              unit: 'week',
              round: 'week',
              isoWeekday: 1,
              displayFormats: {
                week: 'MMM yy'
              }
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              padding: 5,
              font: {
                size: 9
              }
            },
            grid: {
              display: false,
              drawBorder: false,
              tickLength: 0
            }
          }
        },
        layout: {
          padding: {
            top: 10
          }
        }
      },
      displayFrom: DateTime.now({ zone: 'utc', setZone: true }).minus({ weeks: DISPLAY_WEEK_COUNT }).startOf('week'),
      displayTo: DateTime.now({ zone: 'utc', setZone: true }).endOf('week'),
      chartInputData: undefined,
      chartInputDataMax: {
        [CONTENT.FILE_COUNT]: 0,
        [CONTENT.TOTAL_SIZE]: 0
      },
      content: CONTENT.FILE_COUNT
    }
  },
  mounted() {
    this.createChartInputData()
  },
  methods: {
    filterChartInputData: function (chartInputData) {
      return _.filter(chartInputData, (d) => {
        return d.d >= this.displayFrom && d.d <= this.displayTo
      })
    },
    prev: function () {
      this.displayFrom = this.displayFrom.minus({ weeks: 1 })
      this.displayTo = this.displayTo.minus({ weeks: 1 })
    },
    next: function () {
      this.displayFrom = this.displayFrom.plus({ weeks: 1 })
      this.displayTo = this.displayTo.plus({ weeks: 1 })
    },
    createChartInputData: function () {
      let inputData = _.sortBy(
        _.map(this.timelineData, (t) => {
          const tnew = _.cloneDeep(t)
          tnew.date = DateTime.fromISO(t.date)
          return tnew
        }),
        'date'
      )

      const minDate = inputData[inputData.length - 1].date < this.displayFrom ? inputData[inputData.length - 1].date : this.displayFrom
      fillMissing(inputData, 'date', minDate, inputData[inputData.length - 1].date, 'day')

      inputData = _.sortBy(inputData, 'date')

      inputData = _.map(inputData, (t) => {
        const dt = DateTime.fromISO(t.date, { zone: 'utc', setZone: true })

        return {
          x: dt,
          y: dt.weekday,
          d: dt,
          fileCount: t.count,
          totalSize: t.size
        }
      })

      this.chartInputData = inputData
      this.chartInputDataMax[CONTENT.FILE_COUNT] = _.maxBy(inputData, 'fileCount').fileCount
      this.chartInputDataMax[CONTENT.TOTAL_SIZE] = _.maxBy(inputData, 'totalSize').totalSize
    }
  },
  computed: {
    canPrev: function () {
      return this.chartInputData && this.displayFrom > this.chartInputData[0].d
    },
    canNext: function () {
      return this.chartInputData && this.displayTo < this.chartInputData[this.chartInputData.length - 1].d
    },
    chartData: function () {
      const currentContent = this.content
      const currentContentMax = this.chartInputDataMax[currentContent]

      return {
        datasets: [
          {
            data: this.filterChartInputData(this.chartInputData),
            backgroundColor(c) {
              const value = c.dataset.data[c.dataIndex][currentContent]
              const alpha = 100 / currentContentMax * value / 100
              return color('orange').alpha(alpha).rgbString()
            },
            borderColor(c) {
              const value = c.dataset.data[c.dataIndex][currentContent]
              const alpha = value > 0 ? Math.max(100 / currentContentMax * value / 100, 0.1) : 0
              return color('orange').alpha(alpha).darken(0.3).rgbString()
            },
            borderWidth: 1,
            hoverBackgroundColor: 'grey',
            hoverBorderColor: 'black',
            width(c) {
              const a = c.chart.chartArea || {}
              const weeks = c.dataset.data.length / 7
              return (a.right - a.left) / weeks - (weeks < 20 ? 6 : 3)
            },
            height(c) {
              const a = c.chart.chartArea || {}
              return (a.bottom - a.top) / 7 - 2
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 200px !important;
}
</style>

<script setup>
import { createTypedChart } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, TimeScale, Tooltip } from 'chart.js'
import { color } from 'chart.js/helpers'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import 'chartjs-adapter-luxon'
import * as _ from 'lodash-es'
import { DateTime } from 'luxon'
import { fillMissing } from '@/utils/Date'
import { bytesToGibs } from '@/utils/Converter'

ChartJS.register(MatrixController, MatrixElement, LinearScale, TimeScale, Tooltip)
</script>
