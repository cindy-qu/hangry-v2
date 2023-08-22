import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchParams",
  initialState: {
    cuisine: "",
    price: "1",
    radius: "10",
  },
  reducers: {
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRadius: (state, action) => {
      state.radius = action.payload;
    },
  },
});

export const { setCuisine, setPrice, setRadius } = searchSlice.actions;

export default searchSlice.reducer;
