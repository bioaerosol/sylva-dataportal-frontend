<template>
  <div class="card mt-4" v-if="workspace">
    <div class="row card-body">
      <div v-if="workspace.status == WorkspaceStatus.Requested" class="col-12">
        <div class="hugeicon mb-3">
          <font-awesome-icon :icon="['far', 'hourglass-half']" />
        </div>
        <h6>We are preparing your {{ workspace.fileCount }} files with a total size of {{ bytesToGibs(workspace.totalSize, true) }} GiB.</h6>
        <p class="card-text">
          This may take a couple of minutes depending on total size. It does not make sense to refresh this page every second. Please try again in some minutes. In the meantime, you may want to check out SYLVA's LinkedIn channel at <a href="https://www.linkedin.com/company/sylva-bioaerosols"><font-awesome-icon :icon="['fab', 'linkedin']" /> https://www.linkedin.com/company/sylva-bioaerosols</a>.
        </p>
        <p class="card-text">
          You may also close this page and come back later. Just bookmark this page or <a href="#" @click="copyToClipboard(url)"><font-awesome-icon :icon="['far', 'copy']" /> copy URL to clipboard</a> for later use.
        </p>
      </div>

      <div v-if="workspace.status == WorkspaceStatus.Provided" class="col-12">
        <div class="hugeicon mb-3">
          <font-awesome-icon :icon="['far', 'square-check']" />
        </div>
        <h6>We have prepared your {{ workspace.fileCount }} files with a total size of {{ bytesToGibs(workspace.totalSize, true) }} GiB.</h6>
        <p class="card-text">You can download your data <a :href="'/workspace/' + workspace.id">here</a>. Please note that the data is provided for six hours.</p>
      </div>

      <p class="card-text mt-3">Please note that your download is not password-protected. This is not required as SYLVA data is open to public.</p>
    </div>
  </div>

  <div v-if="workspace === undefined" class="alert alert-danger mt-4" role="alert"><font-awesome-icon :icon="['fas', 'robot']" class="me-2" />The document you are looking for is not here (anymore). Please check your URL.</div>
</template>

<script setup>
import { WorkspaceRepository } from '@/repositories/WorkspaceRepository'
import { bytesToGibs } from '@/utils/Converter'

const WorkspaceStatus = {
  Requested: 'requested',
  Provided: 'provided'
}
</script>

<script>
export default {
  components: {},
  props: {
    workspaceId: null
  },
  data: () => {
    return {
      workspace: null
    }
  },
  computed: {
    url() {
      return window.location.href
    }
  },
  watch: {
    workspaceId: {
      handler() {
        if (this.workspaceId) {
          new WorkspaceRepository().get(this.workspaceId).then((response) => {
            this.workspace = response
          }).catch(() => {
            this.workspace = undefined
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.hugeicon {
  font-size: 3em;
  color: var(--bs-secondary);
  text-align: center;
}

h6,
.card-text {
  text-align: center;
}
</style>
