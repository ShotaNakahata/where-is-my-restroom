import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toilets: []
};

const toiletsSlice = createSlice({
  name: "toilets",
  initialState,
  reducers: {
    setToilets: (state, action) => {
      state.toilets = action.payload;
    },
    addToilet: (state, action) => {
      console.log("from toiletsSlice [start add toilet]");
      state.toilets.push(action.payload);
      console.log("from toiletsSlice [state.toilets.push(action.payload)]",state.toilets);
    },
    removeToilet: (state, action) => {
      state.toilets = state.toilets.filter(t => t._id !== action.payload);
    }
  }
});

export const { setToilets, addToilet, removeToilet } = toiletsSlice.actions;
export default toiletsSlice.reducer;
