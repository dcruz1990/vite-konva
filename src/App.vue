<template>
  <div id="container" ref="container"></div>
  <button id="btn">Add Circle</button>
  <button id="addImageBtn">Add Image</button>
  <button id="save">Save Stage</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useKonva } from './utils/useKonva'

export default defineComponent({
  setup() {
    // Bring Konva util
    const { init, getStage } = useKonva()
    // Declare container
    const container = ref()
    // Draw stage, layer and circles
    init()
    // Trying to get Stage    
    const stage = getStage()
    // Sometimes it gets undefined :(
    console.log(stage)


    return {
      container,
    }
  }
})
</script>

