import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  
  isAuthenticated: false,
};
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
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;



