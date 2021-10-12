<template>
  <!-- <div ref="cont"></div> -->

  <v-stage ref="st" :config="configKonva">
    <v-layer ref="layer">
      <v-circle :config="configCircle"></v-circle>
      <v-circle :config="configCircle"></v-circle>
      <v-text :config="sampleText" />
    </v-layer>
  </v-stage>
  <button @click="logSomething">Action</button>
  <button @click="addShape">Add Shape</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Konva from 'konva'
import { Circle } from 'konva/lib/shapes/Circle';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// const configKonva = ref({
//   width: 200,
//   height: 200
// })

// const configCircle = ref({
//   x: 100,
//   y: 100,
//   radius: 70,
//   fill: "red",
//   stroke: "black",
//   strokeWidth: 4
// })
export default defineComponent({
  setup() {
    const stge = Konva.stages[0]

    const configKonva = ref({
      width: 500,
      height: 500
    })

    const configCircle = ref({
      x: 100,
      y: 100,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,

    })

    const sampleText = ref({
      text: "asdasdasdasd"

    })

    const changeText = () => {
      sampleText.value.text = "Change text to"
    }

    const saveToStorage = () => {
      localStorage.setItem('stage', Konva.stages[0].toJSON())
    }

    const loadFromStorage = () => {
      Konva.stages[0].rotate(15)

    }

    const logSomething = () => {
      Konva.stages[0].on('click', () => {
      })
    }

    const addShape = () => {
      let shape = new Konva.Shape({
        x: 10,
        y: 200
      })

      let tempLayer = new Konva.Layer

      tempLayer.add(shape)

      Konva.stages[0].add(tempLayer)

      Konva.stages[0].draw()

    }



    const st = ref(null)
    const layer = ref()

    const test = ref()

    watch(layer, () => {
      console.log("cambio")
    })

    // const circle = new Konva.Circle({
    //   x: stage.width() / 2,
    //   y: stage.height() / 2,
    //   radius: 70,
    //   fill: 'red',
    //   stroke: 'black',
    //   strokeWidth: 1
    // });

    onMounted(() => {
      console.log(st.value)
      console.log(layer.value)

      test.value = Konva.stages[0]
      var json = Konva.stages[0].toJSON()



      // const stage = new Konva.Stage({
      //   container: cont.value,   // id of container <div>
      //   width: 500,
      //   height: 500
      // });

      // then create layer
      // var layer = new Konva.Layer();

      // test.value = layer

      // create our shape
      // var circle = new Konva.Circle({
      //   x: stage.width() / 2,
      //   y: stage.height() / 2,
      //   radius: 70,
      //   fill: 'red',
      //   stroke: 'black',
      //   strokeWidth: 1
      // });

      // circle.draggable(true)

      // add the shape to the layer
      // layer.add(circle);

      // add the layer to the stage
      // stage.add(layer);

      // draw the image
      // layer.draw();

      // circle.on('click', () => {
      //   console.log('clicked')
      // })

      // const addCircle = () => {
      //   layer.add(circle)
      // }
    })



    return {
      st,
      configKonva,
      configCircle,
      layer,
      sampleText,
      changeText,
      saveToStorage,
      loadFromStorage,
      logSomething,
      addShape
    }
  }
})
</script>

