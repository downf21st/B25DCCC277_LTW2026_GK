import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ExpenseTable from "../components/ExpenseTable";

const ExpenseList = ({ expenses, onToggle, onDelete }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQueryShift = (e) => setKeyword(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (category === "Tất cả" || e.category === category)
  );

  const isMobile = width < 768;

  return (
    <div>
      <FilterBar
        keyword={keyword}
        category={category}
        onKeywordChange={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />
      <p>Chế độ: {isMobile ? "Điện thoại" : "Máy tính"}</p>
      <p>Tìm thấy {filtered.length} khoản chi</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className={isMobile ? "table-wrap mobile" : "table-wrap"}>
          <ExpenseTable
            expenses={filtered}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
