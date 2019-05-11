function mapEachKey(object, mapper) {
  const result = {};
  Object.keys(object).forEach((key, idx) => {
    result[key] = mapper(object[key], idx);
  });
  return result;
}

export { mapEachKey };
