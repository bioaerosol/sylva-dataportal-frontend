<template>
    <table class="table">
        <thead>
            <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Download</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="file in outputFiles" :key="file">
                <td>{{ file.filePath }}</td>
                <td>{{ prettyBytes(file.fileSize) }}</td>
                <td><a :download="file.fileName" :href="getOutputFileLink(file.filePath)" target="_blank"><font-awesome-icon :icon="['fas', 'download']" class="me-2" />Download</a></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { AlgorithmRepository } from '@/repositories/AlgorithmRepository';
import prettyBytes from 'pretty-bytes'
</script>

<script>
export default {
  props: {
    runOrderId: String,
    runId: String,
    outputFiles: Array
  },
  data: () => ({
    AlgorithmRepository: new AlgorithmRepository()
  }),
  methods: {
    getOutputFileLink(filePath) {
      return this.AlgorithmRepository.getOutputFileLink(this.runOrderId, this.runId, filePath)
    }
  }
}
</script>

<style scoped>
th {
    font-weight: bold   ;
}
</style>