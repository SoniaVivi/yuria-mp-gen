import { useMemo } from "react";
import { useSelector } from "react-redux";

const useHeadingData = (id) => {
  const rawHeadingData = useSelector((state) => state.heading[id]);

  const headingData = useMemo(() => {
    const { id, text, ...style } = rawHeadingData;
    return {
      id,
      text,
      ...style,
      style: {
        ...style,
        width: `${style.width}px`,
        height: `${style.height}px`,
        fontSize: `${style.fontSize}px`,
        transform: `rotate(${style.rotate}deg)`,
      },
    };
  }, [rawHeadingData]);

  return headingData;
};

export default useHeadingData;
