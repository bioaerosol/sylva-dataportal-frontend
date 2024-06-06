<script setup>
import LocationsList from '@/components/LocationsList.vue'
import LocationsRepository from '@/repositories/LocationsRepository'
import * as _ from 'lodash-es'
</script>

<template>
  <h1>Location Overview</h1>
  <p class="sectionIntro">Several pollen monitors are connected to SYLVA and deliver near-realtime data. In this section you see an overview of connected devices with some information about store level-0 data.</p>
  <LocationsList :locations="locations" />
</template>

<script>
export default {
  components: {
    LocationsList: LocationsList
  },
  data: () => {
    return {
      locations: []
    }
  },
  mounted: function () {
    new LocationsRepository().getAll().then((response) => {
      this.locations = _.sortBy(response, ['country', 'name'])
    })
  }
}
</script>
