import { Routes, Route } from "react-router";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Users from "./Pages/Users";
import Layout from "./Layout";
import Products from "./Pages/Products";
import Categories from "./Pages/Categories";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<Dashboard />} />
        <Route path="dashboard" index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="setting" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
