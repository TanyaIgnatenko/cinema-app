import { getPageOffsets } from './position';
import { Placer } from './Placer';
import { POSITION_UNIT } from '../constants';

function createDragManager({
  ignoreX = false,
  ignoreY = false,
  draggableObjects = [],
  dragOnlyZone = {
    minLeft: -Infinity,
    maxLeft: Infinity,
    minTop: -Infinity,
    maxTop: Infinity,
  },
  relatedToContainer,
  onObjectDidDrag = () => {},
  onObjectDragDidFinish = () => {},
}) {
  let grabbedObject = null;

  const placer = new Placer({
    relatedToContainer,
    positionLimits: dragOnlyZone,
    unit: POSITION_UNIT,
  });

  function onMouseDown(event) {
    if (isLeftMouseButtonClick(event)) prepareToDrag(event);
  }

  function prepareToDrag({ target: object, pageX: cursorX, pageY: cursorY }) {
    grabbedObject = object;
    grabbedObject.position = getPageOffsets(grabbedObject);
    grabbedObject.cursorShiftX = cursorX - grabbedObject.position.left;
    grabbedObject.cursorShiftY = cursorY - grabbedObject.position.top;

    document.onmousemove = dragTo;
    document.onmouseup = finishDrag;
  }

  function dragTo({ pageX: cursorX, pageY: cursorY }) {
    const lastPosition = grabbedObject.position;

    const newPagePosition = {
      left: ignoreX ? lastPosition.left : cursorX - grabbedObject.cursorShiftX,
      top: ignoreY ? lastPosition.top : cursorY - grabbedObject.cursorShiftY,
    };
    const placedPosition = placer.place(grabbedObject, newPagePosition);

    onObjectDidDrag(grabbedObject, placedPosition);
  }

  function finishDrag() {
    document.onmousemove = null;
    document.onmouseup = null;

    onObjectDragDidFinish(grabbedObject);
  }

  return {
    start() {
      draggableObjects.forEach(object => (object.onmousedown = onMouseDown));
    },
    stop() {
      draggableObjects.forEach(object => (object.onmousedown = null));
      document.onmousemove = null;
      document.onmouseup = null;
    },
    setDragOnlyZone(zone) {
      placer.setPositionLimits(zone);
    },
  };
}

const isLeftMouseButtonClick = event => event.which === 1;

export { createDragManager };
