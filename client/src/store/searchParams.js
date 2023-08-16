import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchParams",
  initialState: {
    cuisine: "",
    price: "1",
  },
  reducers: {
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setCuisine, setPrice } = searchSlice.actions;

export default searchSlice.reducer;
