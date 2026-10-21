import React from "react";
import { CATEGORIES } from "../data";

const FilterBar = ({ keyword, category, onKeywordChange, onCategoryChange }) => (
  <div>
    <label htmlFor="search">Tìm kiếm</label>{" "}
    <input
      id="search"
      type="text"
      value={keyword}
      onChange={onKeywordChange}
    />{" "}
    <label htmlFor="filter-category">Danh mục</label>{" "}
    <select
      id="filter-category"
      value={category}
      onChange={onCategoryChange}
    >
      {["Tất cả", ...CATEGORIES].map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;
