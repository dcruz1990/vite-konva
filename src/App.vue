<template>
  <div id="container" ref="container"></div>

  <button @click="drawCircle">Add Circle</button>
  <button @click="drawImage">Add Image</button>
  <button @click="saveToLocalStorage">Save Stage</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useKonva } from './utils/useKonva'

export default defineComponent({
  setup() {
    // Declare container
    const container = ref()

    // Bring Konva Instance
    const { init, drawCircle, drawImage, saveToLocalStorage } = useKonva()

    onMounted(() => {
      // Init Konva
      init(container.value)
    })




    return {
      container,
      drawCircle,
      drawImage,
      saveToLocalStorage
    }
  }
})
</script>

<style scoped>
.container {
  width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: bisque;
}
</style>

