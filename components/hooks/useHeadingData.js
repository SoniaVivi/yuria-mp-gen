import { useMemo } from "react";
import { useSelector } from "react-redux";

const useHeadingData = (id) => {
  const rawHeadingData = useSelector((state) => state.poster.headings[id]);

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
      },
    };
  }, [rawHeadingData]);

  return headingData;
};

export default useHeadingData;
