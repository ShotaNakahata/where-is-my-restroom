import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
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
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      console.log("login from authSlice:state ",state.user,state.isAuthenticated);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      console.log("logout from authSlice:state ",state.user,state.isAuthenticated)
    }
  }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer