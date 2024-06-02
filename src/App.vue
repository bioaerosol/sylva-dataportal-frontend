<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <NavigationBar />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <main>
          <RouterView />
        </main>
      </div>
    </div>
  </div>

  <div class="container border-top mt-5 ps-5 pe-5 bg-light">
    <footer class="py-5">
      <div class="row">
        <div class="col-12 text-dark">
          <p>The overall goal of SYLVA is to achieve a radical improvement and fill gaps in temporal resolution, timeliness, coverage, and availability of information about aeroallergens and other bioaerosols. SYLVA technological innovations will be accompanied with new infrastructure, distribution and exploitation pathways, and links with stakeholders to ensure technology uptake and sustainability beyond the lifetime of the project. &mdash; <a href="https://sylva.bioaerosol.eu/">https://sylva.bioaerosol.eu/</a></p>
        </div>
      </div>

      <div class="py-4 my-4 d-flex justify-content-between">
        <img src="@/assets/EU.svg" alt="Funded by the European Union" />
        <img src="@/assets/SERI.svg" alt="Finish Meteorological Institute" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {
    NavigationBar: NavigationBar
  }
}
</script>

<style scoped>
footer {
  img {
    height: 10rem;
    max-width: 30vw;

    &:first-child {
      margin-right: 3rem;
    }
  }
}
</style>
