<template>
  <div id="container" ref="container"></div>
  <div style="display: flex;">
    <button @click="drawCircle">Add Circle</button>
    <button>Add Image</button>
    <button>Save Stage</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useKonva } from './utils/useKonva'

export default defineComponent({
  setup() {
    // Declare container
    const container = ref()

    // Bring Konva Instance
    const { init, konvaInstance, drawCircle } = useKonva()

    onMounted(() => {
      // Init Konva
      init(container.value)
    })

    return {
      container,
      drawCircle
    }
  }
})
</script>

