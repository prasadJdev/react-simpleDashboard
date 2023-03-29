import React from "react";
import UserInfo from "../Components/UserInfo";
import Chart from "../Components/Chart";

import store from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadStoredProductsDataToState } from "../Data/ProductsSlice";
import { loadStoredDataToState } from "../Data/UsersSlice";

export var storedUsers = [];
export var storedProducts = [];

export default function Dashboard() {
  const dispatch = useDispatch();
  const LOCAL_STORAGE_KEY = "Users.usersData";
  useEffect(() => {
    storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedUsers) dispatch(loadStoredDataToState(storedUsers));
  }, []);

  const LOCAL_STORAGE_KEY2 = "Products.productsData";
  useEffect(() => {
    storedProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2));
    if (storedProducts) dispatch(loadStoredProductsDataToState(storedProducts));
  }, []);

  const existingUsers = store.getState().UsersSlice.users;
  const existingProducts = store.getState().ProductsSlice.products;
  // console.log(store.getState());
  return (
    <>
      <UserInfo
        usersCount={existingUsers.length}
        activeUsers={3}
        productsCount={existingProducts.length}
      />
      <Chart />
    </>
  );
}
