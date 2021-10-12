
<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import Konva from 'konva'

import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

var stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: 500,
  height: 500
});

</script>


