import { getCoords } from './coordsHelpers';

function createDragManager({
  dragAlongX = false,
  dragAlongY = false,
  dragObjectClass = '.draggable',
  dragZone = {
    left: 0,
    right: Infinity,
    top: 0,
    bottom: Infinity,
  },
  positioningContainer,
}) {
  let dragObject = null;

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
    if (!isLeftMouseButtonClick(event)) return;

    dragObject = event.target.closest(dragObjectClass);
    if (!dragObject) return;

    const objectCoords = getCoords(dragObject);
    dragObject.cursorShiftX = event.pageX - objectCoords.left;
    dragObject.cursorShiftY = event.pageY - objectCoords.top;

    prepareToDrag();
  };

  const prepareToDrag = () => {
    document.onmousedown = null;
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
  };

  const dragToX = pageX => {
    let limitedX = limitByLeftBorder(pageX);
    limitedX = limitByRightBorder(limitedX);

    const positionedX = toObjectPositioningSystem({
      x: limitedX,
    }).x;

    dragObject.style.left = `${positionedX}px`;
  };

  const dragToY = pageY => {
    let limitedY = limitByLeftBorder(pageY);
    limitedY = limitByRightBorder(limitedY);

    const positionedY = toObjectPositioningSystem({
      y: limitedY,
    }).y;

    dragObject.style.top = `${positionedY}px`;
  };

  const finishDrag = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    document.onmousedown = onMouseDown;
  };

  const limitByLeftBorder = x => Math.max(dragZone.left, x);

  const limitByRightBorder = x => Math.min(x, dragZone.right);

  return {
    start: () => {
      document.onmousedown = onMouseDown;
    },
    stop: () => {
      document.onmousedown = null;
      document.onmousemove = null;
      document.onmouseup = null;
    },
  };
}

const isLeftMouseButtonClick = event => event.which === 1;

export { createDragManager };
