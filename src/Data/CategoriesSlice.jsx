import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY3 = "Categories.categories";

// It should be a slice

export const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState: {
    //state
    categories: [],
  },
  reducers: {
    addCategory: (state, data) => {
      return {
        ...state,
        categories: addToCategory(data.payload),
      };
    },
    loadStoredCategoriesDataToState: (state, payload) => {
      return {
        ...state,
        categories: payload.payload,
      };
    },
    updateCategory: (state, data) => {
      return { ...state, products: updateCategoryData(data.payload) };
    },
    deleteCategory: (state, data) => {
      return { ...state, products: delCategory(data.payload) };
    },
  },
});

function delCategory(data) {
  const { categories, categoryId } = data;
  let mydata = [];
  mydata = categories.filter((category) => category.id != categoryId);
  localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(mydata));
  return mydata;
}

function updateCategoryData(payload) {
  const { categories, updatedata } = payload;

  let mydata = [];

  const updateCategoryData = categories.map((category) => {
    if (category.id == updatedata.id) {
      return {
        name: updatedata.name,
        price: updatedata.price,
        category: updatedata.category,
        productImg: updatedata.productImg,
    };
    }
    return product;
  });
  mydata=(updateCategoryData);
  localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(mydata));
  return updateCategoryData;
}

function addToCategory(payload) {
  const { data, existing } = payload;

  const mydata = [];

  existing.forEach((e) => {
    mydata.push(e);
  });
  mydata.push(data);
  localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(mydata));
  return mydata;
}

// Action creators are generated for each case reducer function
export const {
  addCategory,
  loadStoredCategoriesDataToState,
  updateCategory,
  deleteCategory,
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
