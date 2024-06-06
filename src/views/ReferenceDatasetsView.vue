<script setup></script>

<template>
  <h1>Reference Datasets</h1>
  <p class="sectionIntro">SYLVA real-time monitoring devices use Machine Learning (ML) algorithms, which may require further development in efficiency. To do this, ML has to be trained and evaluated using real previously categorized data by human experts (labelled data). In this section, we supply you with data that is organized as having one reference dataset per device type.</p>

  <div class="card mt-5" style="width: 18rem">
    <font-awesome-icon :icon="['fas', 'file-zipper']" class="card-img-top"/>
    <div class="card-body">
      <h5 class="card-title">BAA500</h5>
      <p class="card-text">Reference datasets of device type BAA500 in version 2024-05-23.</p>
      <a href="/workspace/referencedatasets/reference_dataset_pomo_20240523.zip" class="btn btn-primary w-100">Download (~ 1GiB)</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.card-img-top {
  font-size: 5em;
  color: var(--bs-secondary);
  margin: 20px;
  width: unset;
}
</style>
