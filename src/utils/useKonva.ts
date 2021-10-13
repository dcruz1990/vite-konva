import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { onMounted, ref } from "vue";

export const useKonva = () => {
  const init = (el?: HTMLDivElement) => {
    const test = ref();

    var imageObj = new Image();
    imageObj.onload = function () {
      var image = new Konva.Image({
        x: 200,
        y: 50,
        image: imageObj,
        width: 100,
        height: 100,
      });
    };
    imageObj.src = "https://picsum.photos/id/1005/300/300";

    onMounted(() => {
      const savedStage = localStorage.getItem("stage");
      const stage = ref();

      if (savedStage) {
        stage.value = Konva.Node.create(JSON.parse(savedStage), "container");
        // stage.add(savedLayer);
      } else {
        stage.value = new Konva.Stage({
          container: el || "container", // id of container <div>
          width: 500,
          height: 500,
        });
      }

      // then create layer
      const layer = new Konva.Layer();

      // create our shape
      const circle = new Konva.Circle({
        x: stage.value.width() / 2,
        y: stage.value.height() / 2,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 1,
      });

      circle.draggable(true);

      // add the shape to the layer
      // layer.add(circle);

      // add the layer to the stage
      stage.value.add(layer);

      // draw the image
      layer.draw();

      stage.value.on("click", () => {
        console.log("clicked");
      });

      const addCircleButton = document.getElementById("btn");
      const addImageButton = document.getElementById("addImageBtn");
      const saveBtn = document.getElementById("save");

      if (saveBtn)
        saveBtn.addEventListener("click", () => {
          localStorage.setItem("stage", stage.value.toJSON());
          alert("Saved to localstorage");
        });

      if (addCircleButton)
        addCircleButton.addEventListener("click", () => {
          let my = new Konva.Circle({
            x: stage.value.width() / 2,
            y: stage.value.height() / 2,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 1,
            draggable: true,
          });
          layer.add(my);
          stage.value.draw();
        });

      if (addImageButton) {
        addImageButton.addEventListener("click", () => {
          console.log("clicked image btn");
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
              layer.add(darthNode);
              stage.value.draw();
            }
          );
        });
      }
    });
  };

  const getStage = () => {
    return Konva.stages[0];
  };

  return {
    init,
    getStage,
  };
};
