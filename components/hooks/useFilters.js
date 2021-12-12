import { useMemo } from "react";
import { useSelector } from "react-redux";

const useFilters = (id) => {
  const filters = useSelector((state) => state.filter[id]);
  const filterEntries = useMemo(() => Object.entries(filters ?? {}), [filters]);
  const filterCSS = useMemo(
    () =>
      filterEntries
        .reduce(
          (a, [name, data]) => `${a} ${name}(${data.value}${data.unit})`,
          ""
        )
        .slice(1),
    [filterEntries]
  );

  return { filters, filterCSS, filterEntries };
};

export default useFilters;
