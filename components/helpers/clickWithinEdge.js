import getLocalCoords from "../helpers/getLocalCoords";

const clickWithinEdge = (e) => {
  const data = getLocalCoords(e);
  const getLimit = (a, b) => Math.min(...[a, b]);
  const lower = (dimension) => dimension * 0.1;
  const upper = (dimension) => dimension * 0.9;
  const limit = 50;

  return (
    data.x <= getLimit(lower(data.width), limit) ||
    data.x >= getLimit(upper(data.width), data.width - limit) ||
    data.y <= getLimit(lower(data.height), limit) ||
    data.y >= getLimit(upper(data.height), data.height - limit)
  );
};

export default clickWithinEdge;
