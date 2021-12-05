import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectMode } from "../posterSlice";

const useHeadingData = () => {
  const headingsData = useSelector((state) => state.poster.headings);
  const mode = useSelector(selectMode);

  const headings = useMemo(
    () =>
      Object.values(headingsData).map(({ id, text, ...style }) => {
        return {
          id,
          text,
          ...style,
          style: {
            ...style,
            fontSize: `${style.fontSize}px`,
            outline: mode == "edit" ? style.outline : null,
          },
        };
      }) ?? [],
    [headingsData, mode]
  );
  return headings;
};

export default useHeadingData;
