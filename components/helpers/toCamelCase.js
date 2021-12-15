const toCamelCase = (str) =>
  str.slice(0, 1).toLowerCase() + str.split(" ").join("").slice(1);

export default toCamelCase;
