import Konva from "konva";
import { ref } from "vue";

export const useKonva = () => {
  const konvaInstance = ref<Konva.Stage>();
  const layer = ref<Konva.Layer>();

  const init = (el: HTMLDivElement) => {
    if (!el) return;

    let savedStage = localStorage.getItem("stage");

    if (savedStage) {
      konvaInstance.value = Konva.Node.create(JSON.parse(savedStage), el);

      layer.value = new Konva.Layer();

      konvaInstance.value?.add(layer.value);
    } else {
      konvaInstance.value = new Konva.Stage({
        container: el || "container", // id of container <div>
        width: 500,
        height: 500,
      });

      layer.value = new Konva.Layer();

      konvaInstance.value.add(layer.value);
    }
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

  const drawImage = () => {
    if (!layer.value) return;

    Konva.Image.fromURL(
      "https://picsum.photos/id/1005/300/300",
      function (darthNode: any) {
        console.log("fire image load");
        darthNode.setAttrs({
          x: 200,
          y: 50,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        darthNode.draggable(true);
        layer.value?.add(darthNode);
        konvaInstance.value?.draw();
      }
    );
  };

  const saveToLocalStorage = () => {
    konvaInstance.value
      ? localStorage.setItem("stage", konvaInstance.value?.toJSON())
      : null;
  };

  return { init, konvaInstance, drawCircle, drawImage, saveToLocalStorage };
};
