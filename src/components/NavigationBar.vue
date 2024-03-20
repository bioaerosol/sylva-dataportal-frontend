<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center me-5">
        <img id="logo" src="@/assets/sylva.png" class="d-inline-block align-top ms-2" alt="SYLVA Logo" />
        <span class="ms-3">SYLVA Data Portal</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link to="/dashboard" class="nav-link"><font-awesome-icon :icon="['fas', 'gauge-high']" class="me-2" />Dashboard</router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/devices" class="nav-link"><font-awesome-icon :icon="['fas', 'desktop']" class="me-2" />Device Overview</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/download" v-bind:exact="$route.path.indexOf('/download') >= 0" :class="{ 'router-link-active router-link-exact-active': $route.path.indexOf('/download') >= 0 }" class="nav-link"><font-awesome-icon :icon="['fas', 'download']" class="me-2" />Level-0 Data Download</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.router-link-active {
  color: var(--bs-nav-link-hover-color);
}

nav.navbar {
  background-color: var(--bg-color-dark);

  .navbar-brand {
    color: #fff;
  }
}

img#logo {
  height: 2em;
}
</style>
