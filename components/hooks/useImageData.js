import { useMemo } from "react";
import { useSelector } from "react-redux";
import useFilters from "./useFilters";

const useImageData = (id) => {
  const rawImageData = useSelector((state) => state.image[id]);
  const { filterCSS } = useFilters(id);

  const headingData = useMemo(() => {
    //eslint-disable-next-line no-unused-vars
    const { id, data, ...style } = rawImageData;
    return {
      id,
      src: data,
      ...style,
      style: {
        ...style,
        width: `${style.width}px`,
        height: `${style.height}px`,
        transform: `rotate(${style.rotate}deg)`,
        filter: filterCSS,
      },
    };
  }, [rawImageData, filterCSS]);

  return headingData;
};

export default useImageData;
