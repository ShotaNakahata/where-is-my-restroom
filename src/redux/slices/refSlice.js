import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginRef: null
}

const refSlice = createSlice({
  name: "ref",
  initialState,
  reducers: {
    setRef: (state, action) => {
      const { key, ref } = action.payload;
      state[key] = ref
    }
  }
})

export const { setRef } = refSlice.actions

export default refSlice.reducer;