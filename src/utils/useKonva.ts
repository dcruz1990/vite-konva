import Konva from "konva";
import { ImageConfig } from "konva/lib/shapes/Image";
import { Stage, StageConfig } from "konva/lib/Stage";
import { ref } from "vue";
import { general } from "./general";

export const useKonva = () => {
  const konvaInstance = ref<Konva.Stage>();
  const layer = ref<Konva.Layer>();
  const tr = ref<Konva.Transformer>();
  const { isEqual } = general();
  const possibleFilters = ref(["", "blur", "invert"]);

  const state = ref<State>({
    arrayObjectsLayer: <any>[],
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

    konvaInstance.value = new Konva.Stage({
      container: el || "container", // id of container <div>
      width: 500,
      height: 500,
    });

    let savedStage = localStorage.getItem("state");

    if (savedStage) {
      const stg: State = JSON.parse(savedStage);

      stg.arrayObjectsLayer.forEach((object) => {
        switch (object.type) {
          case "image":
            drawImage(
              {
                x: object.x,
                y: object.y,
                draggable: object.draggable,
                width: object.width,
                height: object.height,
              },
              object.url
            );
            break;

          default:
            break;
        }
      });

      // konvaInstance.value = Konva.Node.create(JSON.parse(savedStage), el);
    }
    //  else {
    //   konvaInstance.value = new Konva.Stage({
    //     container: el || "container", // id of container <div>
    //     width: 500,
    //     height: 500,
    //   });
    // }

    tr.value = new Konva.Transformer({ keepRatio: true });
    layer.value.add(tr.value);

    konvaInstance.value?.add(layer.value);

    konvaInstance.value?.on("click", (event: any) => {
      transform(event);
    });

    // create();
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

    layer.value?.add(circle);

    state.value.arrayObjectsLayer.push(circle);

    // update(state.value);

    // console.info(state.value);
  };

  const drawImage = (
    config: {
      x: number;
      y: number;
      width?: number;
      height?: number;
      draggable?: boolean;
    },
    url: string
  ) => {
    if (!layer.value) return;

    // Main API
    var imageObj = new Image();
    imageObj.onload = () => {
      var image = new Konva.Image({
        x: config.x,
        y: config.y,
        image: imageObj,
        width: config.width,
        height: config.height,
        draggable: config.draggable,
      });

      // add the shape to the layer
      layer.value?.add(image);
      state.value.arrayObjectsLayer.push({
        url: url,
        x: image.attrs.x,
        y: image.attrs.y,
        width: image.attrs.width,
        height: image.attrs.height,
        type: "image",
        draggable: image.attrs.draggable,
      });
    };
    imageObj.src = url;
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(state.value));
    // konvaInstance.value
    //   ? (localStorage.setItem("stage", konvaInstance.value?.toJSON()),
    //     alert("saved to local"))
    //   : null;
  };

  const transform = (event: any) => {
    if (!konvaInstance.value) return;

    if (isEqual([event.target, konvaInstance.value])) {
      tr.value?.nodes([]);
      return;
    }
    const nodes = tr.value?.nodes().concat([event.target]);
    if (nodes) tr.value?.nodes(nodes);
  };

  // const create = () => {
  //   layer.value?.destroyChildren();
  //   state.value?.arrayObjectsLayer.forEach((item, index) => {
  //     var node = new Konva.Image({
  //       draggable: true,
  //       name: "item-" + index,
  //       // make it smaller
  //       scaleX: 0.5,
  //       scaleY: 0.5,
  //       image: {},
  //     } as ImageConfig);
  //     layer.value?.add(node);
  //     node.on("dragend", () => {
  //       // make new state
  //       state.value = state.value?.slice();
  //       // update object data
  //       if (state.value)
  //         state.value[index] = Object.assign({}, state.value[index], {
  //           x: node.x(),
  //           y: node.y(),
  //         });
  //       // save it into history
  //       saveStateToHistory(state.value);
  //       // don't need to call update here
  //       // because changes already in node
  //     });

  //     node.on("click", () => {
  //       let filter;
  //       // find new filter
  //       if (state.value) {
  //         var oldFilterIndex = possibleFilters.value.indexOf(
  //           state.value[index].filter
  //         );
  //         var nextIndex = (oldFilterIndex + 1) % possibleFilters.value.length;
  //         filter = possibleFilters.value[nextIndex];
  //       }

  //       // apply state changes
  //       state.value = state.value?.slice();

  //       if (state.value)
  //         state.value[index] = Object.assign({}, state.value[index], {
  //           filter: filter,
  //         });
  //       // save state to history
  //       saveStateToHistory(state.value);
  //       // update canvas from state
  //       update(state.value);
  //     });

  //     var img = new window.Image();
  //     img.onload = function () {
  //       node.image(img);
  //       update(state.value);
  //     };
  //     img.src = item.src;
  //   });
  //   update(state.value);
  // };

  const update = (state: any[] | undefined) => {
    if (!state) return;
    state.forEach(function (item, index) {
      var node = konvaInstance.value?.findOne("#container" + index);
      // console.log(node);
      if (node) {
        node.setAttrs({
          x: item.x,
          y: item.y,
        });

        //if (!node.image()) {
        //  return;
        // }
        if (item.filter === "blur") {
          node.filters([Konva.Filters.Blur]);
          node.blurRadius(10);
          node.cache();
        } else if (item.filter === "invert") {
          node.filters([Konva.Filters.Invert]);
          node.cache();
        } else {
          node.filters([]);
          node.clearCache();
        }
      }
    });
  };

  //
  // const saveStateToHistory = (state: any[] | undefined) => {
  //   appHistory.value = appHistory.value.slice(0, appHistoryStep.value + 1);
  //   appHistory.value = appHistory.value.concat([state]);
  //   appHistoryStep.value += 1;
  // };

  return {
    init,
    konvaInstance,
    drawCircle,
    drawImage,
    saveToLocalStorage,
    state,
  };
};
