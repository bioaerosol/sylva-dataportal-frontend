<template>
  <nav class="navbar">
    <a class="navbar-brand d-flex align-items-center">
      <img id="logo" src="@/assets/sylva.png" class="d-inline-block align-top ms-2" alt="SYLVA Logo" />
      <span class="ms-3">SYLVA Data Portal</span>
    </a>
  </nav>
</template>

<style scoped lang="scss">
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
