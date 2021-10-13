<template>
  <div id="container" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useKonva } from './utils/useKonva'




export default defineComponent({
  setup() {
    const { init, getStage } = useKonva()
    const container = ref()
    init()
    const stage = getStage()

    console.log(stage)





    return {
      container,
    }
  }
})
</script>

