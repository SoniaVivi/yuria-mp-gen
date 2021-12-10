import { useMemo } from "react";
import { useSelector } from "react-redux";

const useImageData = (id) => {
  const rawImageData = useSelector((state) => state.poster.images[id]);
  const filters = useSelector((state) => state.poster.images[id].filters);

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
        filter: Object.entries(filters)
          .reduce(
            (a, [name, data]) =>
              data.value ? `${a} ${name}(${data.value}${data.unit})` : a,
            ""
          )
          .slice(1),
      },
    };
  }, [rawImageData, filters]);

  return headingData;
};

export default useImageData;
