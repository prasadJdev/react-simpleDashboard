import store from "../../store";


export function getUserById(id) {
  let users = store.getState().UsersSlice.users;
  let name ;
  if (id=="N/A") {
    return name = "N/A"
  }
  users.map((user) => {
    if (user.id === id) {
      name = user.name;
    }
  });
  return name;
}
