<script setup>
import LocationsList from '@/components/LocationsList.vue'
import LocationsRepository from '@/repositories/LocationsRepository'
import * as _ from 'lodash-es'
</script>

<template>
  <h1>Location Overview</h1>
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
