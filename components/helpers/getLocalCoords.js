const getLocalCoords = (event) => {
  const boundingBox = event.target.getBoundingClientRect();
  return {
    x: event.clientX - boundingBox.x,
    y: event.clientY - boundingBox.y,
    width: boundingBox.width,
    height: boundingBox.height,
  };
};

export default getLocalCoords;
