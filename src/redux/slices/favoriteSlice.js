import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteToilets: []
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favoriteToilets = action.payload;
    },
    pushFavorite: (state, action) => {
      if (!state.favoriteToilets.find(toilet => toilet._id === action.payload._id)) {
        state.favoriteToilets.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteToilets = state.favoriteToilets.filter(t => t._id !== action.payload);
    },    
    clearFavorites: (state) => {
      state.favoriteToilets = []
    }
  }
});

export const { setFavorites, pushFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;