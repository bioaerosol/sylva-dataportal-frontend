<script setup></script>

<template>
  <h1>Reference Datasets</h1>
  <p class="sectionIntro">SYLVA real-time monitoring devices use Machine Learning (ML) algorithms, which may require further development in efficiency. To do this, ML has to be trained and evaluated using real previously categorized data by human experts (labelled data). In this section, we supply you with data that is organized as having one reference dataset per device type.</p>

  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card mt-5 w-100">
        <font-awesome-icon :icon="['fas', 'file-zipper']" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">BAA500</h5>
          <p class="card-text">Reference datasets of device type BAA500.</p>
          <a href="/workspace/referencedatasets/reference_dataset_pomo_20240523.zip" class="btn btn-primary w-100">download (~ 1GiB)</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card mt-5 w-100">
        <font-awesome-icon :icon="['fas', 'file-zipper']" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">Poleno</h5>
          <p class="card-text">Reference datasets of device type Poleno.</p>
          <a href="/workspace/referencedatasets/poleno" class="btn btn-primary w-100">view file list</a>
        </div>
      </div>
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
