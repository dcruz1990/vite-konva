import Konva from "konva";
import { Node } from "konva/lib/Node";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { ref, watch } from "vue";
import { general } from "./general";

export const useKonva = () => {
  const konvaInstance = ref<Konva.Stage>();
  const layer = ref<Konva.Layer>();
  const background = ref<Konva.Image>();
  const tr = ref<Konva.Transformer>();
  const { isEqual, generateGuid } = general();
  const possibleFilters = ref(["", "blur", "invert"]);

  watch(tr, () => {
    console.log(tr.value);
  });

  const state = ref<State>({
    arrayObjectsLayer: <ObjectInState[]>[],
    kanvasWidth: 18.9,
    kanvasHeight: 10,
    widthKanvas: 1600,
    heightKanvas: 800,
    showPallet: false,
    selectedObject: {},
    showBackground: false,
    backgroundOn: true,
    indexTextSelected: 0,
    zoom: 2,
    imgBase64: undefined,
    newTextObj: {
      textEditVisible: false,
      fill: "black",
      textX: 0,
      textY: 0,
      textYTextArea: 0,
      textXTextArea: 0,
      textValue: "Two clicks to edit",
      fontSize: 28,
      width: 250,
      y: 100,
      x: 100,
      height: 150,
      fontStyle: "normal",
      align: "left",
      id: 0,
      type: "text",
    },
    newCircleObj: {
      y: 100,
      x: 100,
      radius: 50,
      fill: "#637EF7",
      id: 0,
      type: "circle",
    },
    newImageObj: {
      x: 100,
      image: null,
      id: 50,
      type: "image",
    },
    newSquareObj: {
      y: 100,
      x: 100,
      width: 100,
      height: 50,
      fill: "#637EF7",
      id: 0,
      type: "square",
    },
    newTriangleObj: {
      y: 100,
      x: 100,
      sides: 3,
      radius: 80,
      fill: "#637EF7",
      id: 0,
      type: "triangule",
    },
    // state draggable stuff
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  });
  const appHistory = ref([state.value]);
  const appHistoryStep = ref(0);

  const init = (el: HTMLDivElement) => {
    if (!el) return;
    layer.value = new Konva.Layer();

    //Build background
    Konva.Image.fromURL(
      "https://picsum.photos/id/1005/300/300",
      function (image: Konva.Image) {
        // image is Konva.Image instance
        if (konvaInstance.value) {
          image.width(konvaInstance.value?.width());
          image.height(konvaInstance.value?.height());
        }
        layer.value?.add(image);
        layer.value?.draw();
      }
    );

    //Instance Konva
    konvaInstance.value = new Konva.Stage({
      container: el || "container", // id of container <div>
      width: 1080,
      height: 1080,
    });

    // var backgroundObject = new Image();
    // backgroundObject.onload = () => {
    //   background.value = new Konva.Image({
    //     name: "Background",
    //     id: generateGuid(),
    //     x: 0,
    //     y: 0,
    //     image: backgroundObject,
    //     width: konvaInstance.value?.width(),
    //     height: konvaInstance.value?.height(),
    //     draggable: false,
    //   });
    // };
    // backgroundObject.src = "https://picsum.photos/id/1005/300/300";

    // White board background
    // background.value = new Konva.Rect({
    //   name: "background",
    //   fill: "white",
    //   x: 0,
    //   y: 0,
    //   width: konvaInstance.value.width(),
    //   height: konvaInstance.value.height(),
    // });

    if (background.value)
      // Add background to Layer
      layer.value?.add(background.value);

    //Clear transformers on background click
    background.value?.on("click", () => {
      tr.value?.nodes([]);
    });

    let savedStage = localStorage.getItem("state");

    if (savedStage) {
      const stg: State = JSON.parse(savedStage);

      stg.arrayObjectsLayer.forEach((object) => {
        switch (object.type) {
          case "circle":
            drawCircle({
              x: object.x,
              y: object.y,
              scaleX: object.scaleX,
              scaleY: object.scaleY,
              fill: object.fill,
              stroke: object.stroke,
              radius: object.radius,
            });

          case "image":
            drawImage(
              {
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                scaleX: object.scaleX,
                scaleY: object.scaleY,
              },
              object.url
            );
            break;

          default:
            break;
        }
      });
    }

    tr.value = new Konva.Transformer({ keepRatio: true });

    layer.value.add(tr.value);

    tr.value.moveToTop();

    konvaInstance.value?.add(layer.value);

    konvaInstance.value?.on("click", (event: any) => {
      console.log(event);
      if (event.target.attrs.name === "background") return;
      transform(event);
    });
  };

  const drawCircle = (config: CircleConfig) => {
    const ctransf = new Konva.Transformer();

    console.log("firing circle");
    if (!layer.value) return;

    let circle = new Konva.Circle({
      id: generateGuid(),
      x: config.x,
      y: config.y,
      radius: config.radius,
      fill: config.fill,
      stroke: config.stroke,
      strokeWidth: config.strokeWidth,
      draggable: true,
      scaleX: config.scaleX,
      scaleY: config.scaleY,
    });

    layer.value?.add(circle);
    layer.value?.add(ctransf);

    const nodes = ctransf.nodes().concat([circle]);

    state.value.arrayObjectsLayer.push({
      id: circle.attrs.id,
      x: circle.attrs.x,
      y: circle.attrs.y,
      radius: circle.attrs.radius,
      fill: circle.attrs.fill,
      stroke: circle.attrs.stroke,
      strokeWidth: circle.attrs.strokeWidth,
      type: "circle",
      scaleX: circle.attrs.scaleX,
      scaleY: circle.attrs.scaleY,
    });

    circle.on("dragend transformend", () => {
      updateState(circle);
    });
  };

  watch(state, () => console.log(state.value.arrayObjectsLayer));

  const drawImage = (
    config: {
      x: number;
      y: number;
      width?: number;
      height?: number;
      scaleX?: 1;
      scaleY?: 1;
    },
    url: string
  ) => {
    if (!layer.value) return;

    // Main API
    var imageObj = new Image();
    imageObj.onload = () => {
      var image = new Konva.Image({
        id: generateGuid(),
        x: config.x,
        y: config.y,
        image: imageObj,
        width: config.width,
        height: config.height,
        draggable: true,
        scaleX: config.scaleX,
        scaleY: config.scaleY,
      });

      // add the shape to the layer
      layer.value?.add(image);

      // Put the Image into the state
      state.value.arrayObjectsLayer.push({
        id: image.attrs.id,
        url: url,
        x: image.attrs.x,
        y: image.attrs.y,
        type: "image",
        draggable: image.attrs.draggable,
        scaleX: image.scaleX,
        scaleY: image.scaleY,
      });

      // Update state when Image is draged
      image.on("dragend transformend", () => {
        updateState(image);
      });
    };
    imageObj.src = url;
  };

  const updateState = (source: any) => {
    console.log(source);
    state.value.arrayObjectsLayer = state.value.arrayObjectsLayer.map(
      (item) => {
        if (item.id === source.attrs.id) {
          item.x = source.attrs.x;
          item.y = source.attrs.y;
          item.scaleX = source.attrs.scaleX;
          item.scaleY = source.attrs.scaleY;
        }

        return item;
      }
    );
  };

  const saveToLocalStorage = () => {
    if (konvaInstance.value)
      localStorage.setItem("stage", konvaInstance.value.toJSON());
    localStorage.setItem("state", JSON.stringify(state.value));
  };

  const transform = (event: any) => {
    if (!konvaInstance.value) return;
    console.log(tr.value?.nodes());

    // if (isEqual([event.target, konvaInstance.value])) {
    //   tr.value?.nodes([]);
    //   return;
    // }

    let bck = tr.value
      ?.nodes()
      .filter((item) => item.name === background.value?.name);

    // let exists = tr.value
    //   ?.nodes()
    //   .filter((item) => item.id === event.target.attrs.id);

    // if (tr.value && exists) {
    //   for (var i = 0; i < tr.value?.nodes().length; i++) {
    //     if (tr.value?.nodes()[i].id === exists[0].id) {
    //       tr.value?.nodes().splice(i, 1);
    //     }
    //   }

    //   return;
    // }

    const nodes = tr.value?.nodes().concat([event.target]);

    if (bck) tr.value?.nodes([]);

    if (nodes) tr.value?.nodes(nodes);
  };

  // const saveStateToHistory = (state: any[] | undefined) => {
  //   appHistory.value = appHistory.value.slice(0, appHistoryStep.value + 1);
  //   appHistory.value = appHistory.value.concat([state]);
  //   appHistoryStep.value += 1;
  // };

  function createObject(attrs: any) {
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
  }

  return {
    init,
    konvaInstance,
    drawCircle,
    drawImage,
    saveToLocalStorage,
    state,
  };
};
