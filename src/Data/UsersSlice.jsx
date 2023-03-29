import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "Users.usersData";

// It should be a slice

export const UsersSlice = createSlice({
  name: "UsersSlice",
  initialState: {
    //state
    users: [],
  },
  reducers: {
    addUser: (state, data) => {
      return {
        ...state,
        users: updateUsers(data.payload),
      };
    },
    loadStoredDataToState: (state, payload) => {
      return {
        ...state,
        users: payload.payload,
      };
    },
    updateUser: (state, data) => {
      return { ...state, users: updateUserData(data.payload) };
    },
    deleteUser: (state, data) => {
      return { ...state, users: delUser(data.payload) };
    },
   
  },
});

function delUser(data) {
  const { users, userId } = data;
  let mydata = [];
  mydata = users.filter((user) => user.id != userId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mydata));
  return mydata;
}

function updateUserData(payload) {
  const { users, updatedata } = payload;

  let mydata = [];

  const updateUserData = users.map((user) => {
    if (user.id == updatedata.id) {
      return {
        id: updatedata.id,
        name: updatedata.name,
        email: updatedata.email,
        phoneNumber: updatedata.phoneNumber,
        address: updatedata.address,
      };
    }
    return user;
  });

  mydata = updateUserData;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mydata));

  return updateUserData;
}

function updateUsers(payload) {
  const { data, existing } = payload;

  const mydata = [];

  existing.forEach((e) => {
    mydata.push(e);
  });

  mydata.push(data);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mydata));

  return mydata;
}

// Action creators are generated for each case reducer function
export const {
  addUser,
  loadStoredDataToState,
  updateUser,
  deleteUser,
  
} = UsersSlice.actions;

export default UsersSlice.reducer;
