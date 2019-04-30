import { getPageOffsets } from './position';

const defaultConfig = {
  relatedToContainer: document.body,
  positionLimits: {
    minLeft: -Infinity,
    maxLeft: Infinity,
    minTop: -Infinity,
    maxTop: Infinity,
  },
  unit: 'px',
};

class Placer {
  constructor({
    relatedToContainer = document.body,
    positionLimits = {
      minLeft: -Infinity,
      maxLeft: Infinity,
      minTop: -Infinity,
      maxTop: Infinity,
    },
    unit = 'px',
  } = defaultConfig) {
    const offsets = getPageOffsets(relatedToContainer);
    this.system = {
      offsetLeft: offsets.left,
      offsetTop: offsets.top,
    };

    this.positionLimits = positionLimits;
    this.unit = unit;

    relatedToContainer.style.position = 'relative';
  }

  place(element, pagePosition) {
    const containerPosition = this.toContainerPosition(pagePosition);
    const limitedPosition = this.limitPosition(containerPosition);

    // TODO: Если этот класс теперь не размещает объекты, а просто высчитывает координаты, стоит ли его так называть?
    // element.style.position = 'absolute';
    // element.style.left = limitedPosition.left + this.unit;
    // element.style.top = limitedPosition.top + this.unit;

    return limitedPosition;
  }

  toContainerPosition(pagePosition) {
    return {
      left: pagePosition.left - this.system.offsetLeft,
      top: pagePosition.top - this.system.offsetTop,
    };
  }

  limitPosition(position) {
    return {
      left: this.limitLeft(position.left),
      top: this.limitTop(position.top),
    };
  }

  limitLeft(left) {
    return Math.min(
      Math.max(this.positionLimits.minLeft, left),
      this.positionLimits.maxLeft,
    );
  }

  limitTop(top) {
    return Math.min(
      Math.max(this.positionLimits.minTop, top),
      this.positionLimits.maxTop,
    );
  }

  setPositionLimits(positionLimits) {
    this.positionLimits = positionLimits;
  }
}

export { Placer };
