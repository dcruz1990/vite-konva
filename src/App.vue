<template>
  <div id="container" ref="container"></div>

  <button @click="drawCircle">Add Circle</button>
  <button @click="addImage">Add Image</button>
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
    const { init, drawCircle, drawImage, saveToLocalStorage, state } = useKonva()

    onMounted(() => {
      // Init Konva
      init(container.value)
      // console.log(state.value)
    })

    const addImage = () => {
      drawImage({
        x: 100,
        y: 100,
        draggable: true,
      }, "https://picsum.photos/id/1005/300/300")
    }




    return {
      container,
      drawCircle,
      addImage,
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

