const BUILD_TAG = "mv-3358";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import ExpenseDetail from "./pages/ExpenseDetail";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("gk_expenses");
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
        setLoading(false);
        return;
      } catch (err) {
        localStorage.removeItem("gk_expenses");
      }
    }
    const controller = new AbortController();
    axios
      .get("/data/expenses.json", { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("Không tải được dữ liệu");
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem("gk_expenses", JSON.stringify(expenses));
    }
  }, [expenses, loading, error]);

  const addExpense = (data) => {
    setExpenses((prev) => {
      const newId = prev.reduce((max, e) => Math.max(max, e.id), 0) + 1;
      return [...prev, { id: newId, ...data, paid: false }];
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const togglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, paid: !e.paid } : e))
    );
  };

  const guard = (content) => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    return content;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout buildTag={BUILD_TAG} />}>
        <Route index element={guard(<Home expenses={expenses} />)} />
        <Route
          path="expenses"
          element={guard(
            <ExpenseList
              expenses={expenses}
              onToggle={togglePaid}
              onDelete={deleteExpense}
            />
          )}
        />
        <Route
          path="expenses/new"
          element={guard(<AddExpense onAdd={addExpense} />)}
        />
        <Route
          path="expenses/:id"
          element={guard(<ExpenseDetail expenses={expenses} />)}
        />
      </Route>
    </Routes>
  );
};

export default App;
