import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./Data/UsersSlice";
import ProductsSlice from "./Data/ProductsSlice";
import CategoriesSlice from "./Data/CategoriesSlice";
export default configureStore({
  reducer: { UsersSlice, ProductsSlice, CategoriesSlice },
});
