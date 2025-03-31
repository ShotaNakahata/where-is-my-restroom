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
    //listpageでまとまったpage分の登録
    addToilet: (state, action) => {
      if (!state.isFullDataFetched) {
        const newToilets = action.payload.filter(
          (incoming) => !state.toilets.some((existing) => existing._id === incoming._id)
        );
        state.toilets = [...state.toilets, ...newToilets];
      }
    },
    //新規トイレ登録を即座にui表示
    addSingleToilet: (state, action) => {
      const newToilet = action.payload;
      const exists = state.toilets.some((t) => t._id === newToilet._id);
      if (!exists) {
        state.toilets.push(newToilet);
      }
    },
    removeToilet: (state, action) => {
      state.toilets = state.toilets.filter(t => t._id !== action.payload);
    }
  }
});

export const { setToilets, addToilet, removeToilet,addSingleToilet } = toiletsSlice.actions;
export default toiletsSlice.reducer;
