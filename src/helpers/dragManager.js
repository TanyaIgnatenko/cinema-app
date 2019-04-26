import { getCoords } from './coordsHelpers';

function createDragManager({
  dragAlongX = false,
  dragAlongY = false,
  dragObjects = [],
  dragZone = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity,
  },
  positioningContainer,
  onObjectDidDrag = () => {},
}) {
  let currentDragObject = null;

  const containerCoords = getCoords(positioningContainer);
  const positioningObjectSystem = {
    offsetX: containerCoords.left,
    offsetY: containerCoords.top,
  };

  const toObjectPositioningSystem = ({ x, y }) => ({
    x: x - positioningObjectSystem.offsetX,
    y: y - positioningObjectSystem.offsetY,
  });

  const onMouseDown = event => {
    if (isLeftMouseButtonClick(event)) prepareToDrag(event);
  };

  const prepareToDrag = event => {
    currentDragObject = event.target;
    const cursorX = event.pageX;
    const cursorY = event.pageY;
    const objectCoords = getCoords(currentDragObject);
    currentDragObject.cursorShiftX = cursorX - objectCoords.left;
    currentDragObject.cursorShiftY = cursorY - objectCoords.top;

    dragObjects.forEach(dragObject => (dragObject.onmousedown = null));
    document.onmousemove = dragTo;
    document.onmouseup = finishDrag;
  };

  const dragTo = ({ pageX, pageY }) => {
    if (dragAlongX) {
      dragToX(pageX);
    }
    if (dragAlongY) {
      dragToY(pageY);
    }
    onObjectDidDrag();
  };

  const dragToX = pageX => {
    let limitedX = limitByLeftBorder(pageX);
    limitedX = limitByRightBorder(limitedX);

    const positionedX = toObjectPositioningSystem({
      x: limitedX,
    }).x;

    currentDragObject.style.left = `${positionedX}px`;
  };

  const dragToY = pageY => {
    let limitedY = limitByLeftBorder(pageY);
    limitedY = limitByRightBorder(limitedY);

    const positionedY = toObjectPositioningSystem({
      y: limitedY,
    }).y;

    currentDragObject.style.top = `${positionedY}px`;
  };

  const finishDrag = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    dragObjects.forEach(dragObject => (dragObject.onmousedown = onMouseDown));
  };

  const limitByLeftBorder = x => Math.max(dragZone.left, x);

  const limitByRightBorder = x => Math.min(x, dragZone.right);

  return {
    start: () => {
      dragObjects.forEach(dragObject => (dragObject.onmousedown = onMouseDown));
    },
    stop: () => {
      dragObjects.forEach(dragObject => (dragObject.onmousedown = null));
      document.onmousemove = null;
      document.onmouseup = null;
    },
  };
}

const isLeftMouseButtonClick = event => event.which === 1;

export { createDragManager };
