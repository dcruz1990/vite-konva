interface NodeObject {
  name: string;
  x: number;
  y: number;
  src?: string;
  dragable: boolean;
}

interface State {
  arrayObjectsLayer: Array<any>;
  kanvasWidth: number;
  kanvasHeight: number;
  widthKanvas: number;
  heightKanvas: number;
  showPallet: boolean;
  selectedObject: Object;
  showBackground: boolean;
  backgroundOn: boolean;
  indexTextSelected: number;
  zoom: number;
  imgBase64: undefined;
  newTextObj: {
    textEditVisible: boolean;
    fill: string;
    textX: number;
    textY: number;
    textYTextArea: number;
    textXTextArea: number;
    textValue: string;
    fontSize: number;
    width: number;
    y: number;
    x: number;
    height: number;
    fontStyle: string;
    align: string;
    id: number;
    type: string;
  };
  newCircleObj: {
    y: number;
    x: number;
    radius: number;
    fill: string;
    id: number;
    type: string;
  };
  newImageObj: {
    x: number;
    image: null;
    id: number;
    type: string;
  };
  newSquareObj: {
    y: number;
    x: number;
    width: number;
    height: number;
    fill: string;
    id: number;
    type: string;
  };
  newTriangleObj: {
    y: number;
    x: number;
    sides: 3;
    radius: number;
    fill: string;
    id: number;
    type: string;
  };
  // state draggable stuff
  activeDrags: number;
  deltaPosition: {
    x: number;
    y: number;
  };
  controlledPosition: {
    x: number;
    y: number;
  };
}
