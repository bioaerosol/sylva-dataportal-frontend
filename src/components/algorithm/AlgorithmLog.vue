<template>
  <div>
    <span v-for="(value, key) in sections" :key="key">
      <algorithm-log-section :sectionKey="key" :sectionContent="value" />
    </span>
  </div>
</template>

<script setup>
import AlgorithmLogSection from '@/components/algorithm/AlgorithmLogSection.vue'
</script>

<script>
export default {
  props: {
    sections: Object
  }
}
</script>
