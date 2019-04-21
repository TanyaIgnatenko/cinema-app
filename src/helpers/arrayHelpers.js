function range(start, end) {
  return [...Array(end - start + 1).keys()].map(key => key + start);
}

export { range };
