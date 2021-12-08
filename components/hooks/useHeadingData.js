import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectMode } from "../posterSlice";

const useHeadingData = (id) => {
  const rawHeadingData = useSelector((state) => state.poster.headings[id]);
  const mode = useSelector(selectMode);

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
        outline: mode == "edit" ? style.outline : null,
      },
    };
  }, [rawHeadingData, mode]);

  return headingData;
};

export default useHeadingData;
