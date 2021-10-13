import Konva from "konva";
import { onMounted } from "vue";

export const useKonva = () => {
  const init = (el?: HTMLDivElement) => {
    onMounted(() => {
      const stage = new Konva.Stage({
        container: el || "container", // id of container <div>
        width: 500,
        height: 500,
      });

      // then create layer
      const layer = new Konva.Layer();

      // create our shape
      const circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 1,
      });

      circle.draggable(true);

      // add the shape to the layer
      // layer.add(circle);

      // add the layer to the stage
      stage.add(layer);

      // draw the image
      layer.draw();

      stage.on("click", () => {
        console.log("clicked");
      });

      stage.on("click", () => {
        let my = new Konva.Circle({
          x: stage.width() / 2,
          y: stage.height() / 2,
          radius: 70,
          fill: "red",
          stroke: "black",
          strokeWidth: 1,
        });
        layer.add(my);

        stage.draw();
      });
    });
  };

  return {
    init,
  };
};
