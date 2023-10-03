import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    updateAfterDelete: false,
    updateAfter: false,
    updateBookmarkCard: [],
    updateBookmarkNote: [],
    updateAfterBookmark: [],
    loginUpdate: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUpdateAfterDelete,
  setUpdateAfter,
  setUpdateBookmarkCard,
  setUpdateBookmarkNote,
  setUpdateAfterBookmark,
  setLoginUpdate,
} = updateSlice.actions;

export default updateSlice.reducer;
