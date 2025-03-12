import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
}
//dipatchの例
// dispatch(login(userData)) 
// そのuserDataの内容は↓
// const userData = {
//   id: 1,
//   name: "John Doe",
//   email: "johndoe@example.com",
// };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    singup: (state, action) => {
      const newUser = action.payload;
      localStorage.setItem("user", JSON.stringify(newUser));
      state.user = newUser
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log("login from authSlice:state ", state.user, state.isAuthenticated);
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      console.log("logout from authSlice:state ", state.user, state.isAuthenticated)
      localStorage.removeItem("user");
    }
  }
})

export const { login, logout,singup } = authSlice.actions;
export default authSlice.reducer