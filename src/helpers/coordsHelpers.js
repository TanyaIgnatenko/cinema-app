function getCoords(element) {
  return element.getBoundingClientRect();
}

function getPositionedLeft(element) {
  return parseInt(element.style.left, 10);
}

function getPositionedTop(element) {
  return parseInt(element.style.top, 10);
}

function getObjectPosition(element) {
  return {
    left: getPositionedLeft(element),
    top: getPositionedTop(element),
  };
}

export { getCoords, getPositionedLeft, getPositionedTop, getObjectPosition };
