import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { ref } from "vue";

export const useKonva = () => {
  const konvaInstance = ref<Konva.Stage>();
  const layer = ref<Konva.Layer>();
  const tr = ref<Konva.Transformer>();

  const state = ref<NodeObject[]>();

  const init = (el: HTMLDivElement) => {
    if (!el) return;

    let savedStage = localStorage.getItem("stage");

    if (savedStage) {
      konvaInstance.value = Konva.Node.create(JSON.parse(savedStage), el);
    } else {
      konvaInstance.value = new Konva.Stage({
        container: el || "container", // id of container <div>
        width: 500,
        height: 500,
      });
    }

    layer.value = new Konva.Layer();

    tr.value = new Konva.Transformer({ keepRatio: true });
    layer.value.add(tr.value);

    konvaInstance.value?.add(layer.value);

    konvaInstance.value?.on("click", (event: any) => {
      transform(event);
    });
  };

  const createObject = (attrs: any) => {
    return Object.assign({}, attrs, {
      // define position
      x: 0,
      y: 0,
      // here should be url to image
      src: "",
      // and define filter on it, let's define that we can have only
      // "blur", "invert" or "" (none)
      filter: "blur",
    });
  };

  const drawCircle = () => {
    if (!konvaInstance.value) return;

    let circle = new Konva.Circle({
      name: "Red circle",
      x: konvaInstance.value?.width() / 2,
      y: konvaInstance.value.height() / 2,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 1,
      draggable: true,
    });

    state.value?.push();

    layer.value?.add(circle);
  };

  const drawImage = () => {
    if (!layer.value) return;

    Konva.Image.fromURL(
      "https://picsum.photos/id/1005/300/300",
      function (imageNode: any) {
        console.log("fire image load");
        imageNode.setAttrs({
          x: 200,
          y: 50,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        imageNode.draggable(true);
        layer.value?.add(imageNode);
      }
    );
  };

  const saveToLocalStorage = () => {
    konvaInstance.value
      ? (localStorage.setItem("stage", konvaInstance.value?.toJSON()),
        alert("saved to local"))
      : null;
  };

  const transform = (event: any) => {
    console.log(event.target.attrs.width);
    if (konvaInstance.value) console.log(konvaInstance.value.width);
    if (event.target.attrs.width === konvaInstance.value?.width) {
      console.info("iguales");
      tr.value?.nodes([]);
      return;
    }
    // const nodes = tr.value?.nodes().concat([event.target]);
    // if (nodes) tr.value?.nodes(nodes);
  };

  return { init, konvaInstance, drawCircle, drawImage, saveToLocalStorage };
};
