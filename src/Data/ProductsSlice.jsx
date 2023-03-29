import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY2 = "Products.productsData";

// It should be a slice

export const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState: {
    //state
    products: [],
  },
  reducers: {
    addProduct: (state, data) => {
      return {
        ...state,
        products: addProducts(data.payload),
      };
    },
    loadStoredProductsDataToState: (state, payload) => {
      return {
        ...state,
        products: payload.payload,
      };
    },
    updateProduct: (state, data) => {
      // console.log(data.payload);
      return { ...state, products: updateProductData(data.payload) };
    },
    deleteProduct: (state, data) => {
      return { ...state, products: delProduct(data.payload) };
    },
  },
});

function delProduct(data) {
  const { products, productId } = data;
  let mydata = [];
  mydata = products.filter((product) => product.id != productId);
  localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(mydata));
  return mydata;
}

function updateProductData(payload) {
  const { products, updatedata } = payload;

  let mydata = [];

  const updateUserData = products.map((product) => {
    if (product.id == updatedata.id) {
      return {
        id: updatedata.id,
        name: updatedata.name,
        price: updatedata.price,
        category: updatedata.category,
        productImg: updatedata.productImg,
        soldBy: updatedata.soldBy
        // address: updatedata.address,
      };
    }
    return product;
  });
  // console.log("mydata");
  // console.log(mydata);
  mydata = updateUserData;
  localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(mydata));
  return updateUserData;
}

// function updateUserData(payload) {
//   const { users, updatedata } = payload;

//   const mydata = [];

//   const updateUserData = users.map((user) => {
//     if (user.id == updatedata.id) {
//       return {
//         name: updatedata.name,
//         email: updatedata.email,
//         phoneNumber: updatedata.phoneNumber,
//         address: updatedata.address,
//       };
//     }
//     return user
//   });

//   mydata.push(updateUserData);

//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mydata));

//   return updateUserData;

// }

function addProducts(payload) {
  const { data, existing } = payload;

  const mydata = [];

  existing.forEach((e) => {
    mydata.push(e);
  });
  mydata.push(data);
  localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(mydata));
  return mydata;
}

// Action creators are generated for each case reducer function
export const {
  addProduct,
  loadStoredProductsDataToState,
  updateProduct,
  deleteProduct,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
