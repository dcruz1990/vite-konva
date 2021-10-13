<template>
  <div id="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useKonva } from './utils/useKonva'




export default defineComponent({
  setup() {
    const { init } = useKonva()
    const container = ref()
    init()





    return {
      container,
    }
  }
})
</script>

