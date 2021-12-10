import getLocalCoords from "../helpers/getLocalCoords";

const clickWithinEdge = (e) => {
  const data = getLocalCoords(e);
  return (
    data.x <= data.width * 0.1 ||
    data.x >= data.width * 0.9 ||
    data.y <= data.height * 0.1 ||
    data.y >= data.height * 0.9
  );
};

export default clickWithinEdge;
