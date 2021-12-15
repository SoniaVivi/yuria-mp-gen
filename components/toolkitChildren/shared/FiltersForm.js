import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import OptionsMenu from "../../OptionsMenu";
import NumberForm from "../../NumberForm";
import style from "../../../styles/ImagesChild.module.scss";
import {
  addFilter,
  filterDefaults,
  setFilter,
} from "../../slices/filtersSlice";
import useFilters from "../../hooks/useFilters";
import fromCamelCase from "../../helpers/fromCamelCase";
import toCamelCase from "../../helpers/toCamelCase";

const FiltersForm = (props) => {
  const { filterEntries: filters } = useFilters(props.id);
  const dispatch = useDispatch();
  const possibleFilters = useMemo(
    () => Object.keys(filterDefaults).map((s) => fromCamelCase(s)),
    []
  );

  return (
    <div className={style["filter-container"]}>
      <OptionsMenu
        current={props.defaultText ?? `Add Image Filter`}
        options={possibleFilters}
        setOptionFunc={(filter) =>
          dispatch(addFilter(props.id, toCamelCase(filter)))
        }
        className={style["add-filter"]}
      />
      <div className={style["fill-row"]}></div>
      {filters.map(([filterName, filterData], i) => (
        <div key={i} className={style["filter-wrapper"]}>
          <span>
            {filterName.slice(0, 1).toUpperCase() +
              filterName.slice(1).replace(/(?=[A-Z])/, " ")}
          </span>
          <div>
            {filterData.unit.constructor != Array ? (
              <NumberForm
                value={filterData.value}
                min={filterData.min}
                max={filterData.max}
                onChange={(val) => {
                  dispatch(
                    setFilter(props.id, filterName, val(filterData.value))
                  );
                }}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltersForm;

FiltersForm.propTypes = {
  id: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
};
