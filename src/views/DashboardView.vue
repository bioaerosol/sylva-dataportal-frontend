<template>
  <!--<storage-by-device-doughnut-chart :timelineData="timelineData" />-->
  <div class="alert alert-primary" role="alert">Dashboard capabilities are in implementation phase. Stay tuned for updates.</div>
</template>

<script setup>

import { TimelineRepository, TimelineResolution } from '@/repositories/TimelineRepository'
</script>
<script>
export default {
  components: {
    //'storage-by-device-doughnut-chart': StorageByDeviceDoughnutChart
  },
  data: () => ({
    timelineData: []
  }),
  mounted: function () {
    new TimelineRepository().getTimeline(TimelineResolution.YEAR).then((response) => {
      this.timelineData = response
    })
  }
}
</script>
