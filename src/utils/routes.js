function createRoute(apiURL, replacer) {
  const key = Object.keys(replacer)[0];
  return apiURL.replace(`:${key}`, replacer[key]);
}

export { createRoute };