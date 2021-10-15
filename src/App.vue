<template>
  <div
    id="container"
    ref="container"
    style="border: 1px solid black;display: flex;justify-content: center;background-color: darkgray;"
  ></div>

  <button @click="addCircle">Add Circle</button>
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
        scaleX: 1,
        scaleY: 1
      }, "https://picsum.photos/id/1005/300/300")
    }

    const addCircle = () => {
      drawCircle({
        x: 100,
        y: 100,
        fill: "red",
        stroke: "black",
        radius: 70
      })
    }




    return {
      container,
      addCircle,
      addImage,
      saveToLocalStorage,

    }
  }
})
</script>

<style scoped>
</style>

