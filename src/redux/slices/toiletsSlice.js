import { createSlice } from "@reduxjs/toolkit";

//isFullDataFetched: mapではすべてのtoilet dataを取得する為mapで全てのdataを取得したかどうかを判断する為
const initialState = {
  toilets: [],
  isFullDataFetched: false,
};

const toiletsSlice = createSlice({
  name: "toilets",
  initialState,
  reducers: {
    setToilets: (state, action) => {
      state.toilets = action.payload;
      state.isFullDataFetched = true;
    },
    addToilet: (state, action) => {
      if (!state.isFullDataFetched) {
        const newToilets = action.payload.filter(
          (incoming) => !state.toilets.some((existing) => existing._id === incoming._id)
        );
        state.toilets = [...state.toilets, ...newToilets];
      }
    },
    removeToilet: (state, action) => {
      state.toilets = state.toilets.filter(t => t._id !== action.payload);
    }
  }
});

export const { setToilets, addToilet, removeToilet } = toiletsSlice.actions;
export default toiletsSlice.reducer;
