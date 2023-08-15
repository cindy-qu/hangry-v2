import { createSlice } from '@reduxjs/toolkit';

export const updateSlice = createSlice({
    name: "update",
    initialState: {
        updateAfterDelete: false,
        updateBookmarkCard: [],
        updateBookmarkNote: [],
        updateAfterBookmark: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setUpdateAfterDelete, setUpdateBookmarkCard, setUpdateBookmarkNote, setUpdateAfterBookmark } = updateSlice.actions

export default updateSlice.reducer;

