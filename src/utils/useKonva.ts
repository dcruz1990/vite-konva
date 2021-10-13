import Konva from "konva";
import { ref } from "vue";

export const useKonva = () => {
  const konvaInstance = ref<Konva.Stage>();
  const layer = ref<Konva.Layer>();

  const init = (el: HTMLDivElement) => {
    konvaInstance.value = new Konva.Stage({
      container: el || "container", // id of container <div>
      width: 500,
      height: 500,
    });

    layer.value = new Konva.Layer();

    konvaInstance.value.add(layer.value);
  };

  const drawCircle = () => {
    if (!konvaInstance.value) return;

    let circle = new Konva.Circle({
      x: konvaInstance.value?.width() / 2,
      y: konvaInstance.value.height() / 2,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 1,
      draggable: true,
    });

    layer.value?.add(circle);
  };

  return { init, konvaInstance, drawCircle };
};
