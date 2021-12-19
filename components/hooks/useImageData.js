import { useMemo } from "react";
import { useSelector } from "react-redux";

const useImageData = (id) => {
  const rawImageData = useSelector((state) => state.image[id]);
  const filters = useSelector((state) => state.filter[id]);

  const headingData = useMemo(() => {
    //eslint-disable-next-line no-unused-vars
    const { id, data, filters: _, ...style } = rawImageData;
    return {
      id,
      src: data,
      ...style,
      style: {
        ...style,
        width: `${style.width}px`,
        height: `${style.height}px`,
        transform: `rotate(${style.rotate}deg)`,
        filter: Object.entries(filters ?? {})
          .reduce(
            (a, [name, data]) => `${a} ${name}(${data.value}${data.unit})`,
            ""
          )
          .slice(1),
      },
    };
  }, [rawImageData, filters]);

  return headingData;
};

export default useImageData;
