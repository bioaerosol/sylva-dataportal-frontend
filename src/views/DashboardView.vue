<script setup>
import LocationsList from '@/components/LocationsList.vue';
import LocationsRepository from '@/repositories/LocationsRepository';


</script>

<template>
  <main>
    <LocationsList :locations="locations" />
  </main>
</template>

<script>
export default {
  components: {
    LocationsList: LocationsList
  },
  data: () => ({
    locations: []
  }),
  mounted: function() {
    new LocationsRepository().getAll().then((response) => {
      this.locations = response;
    })
  }
}
</script>