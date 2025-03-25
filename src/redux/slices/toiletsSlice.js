// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   toilets: []
// };

// const toiletsSlice = createSlice({
//   name: "toilets",
//   initialState,
//   reducers: {
//     setToilets: (state, action) => {
//       console.log(" action.payload", action.payload);
//       state.toilets = action.payload;
//     },
//     addToilet: (state, action) => {
//       state.toilets.push(action.payload);
//     }
//   }
// });

// export const { setToilets, addToilet } = toiletsSlice.actions;
// export default toiletsSlice.reducer;
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
      state.toilets.push(action.payload);
    },
    removeToilet: (state, action) => {
      state.toilets = state.toilets.filter(t => t._id !== action.payload);
    }
  }
});

export const { setToilets, addToilet, removeToilet } = toiletsSlice.actions;
export default toiletsSlice.reducer;
