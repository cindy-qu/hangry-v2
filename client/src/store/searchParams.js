import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchParams",
  initialState: {
    cuisine: "",
    price: "1",
    distance: "5",
  },
  reducers: {
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
  },
});

export const { setCuisine, setPrice, setDistance } = searchSlice.actions;

export default searchSlice.reducer;
