import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
    name: "geoLocation",
    initialState: {
        lat: null,
        long: null,
        locationError: [],

    },
    reducers: {
        setLat: (state, action) => {
            state.lat = action.payload;
        },
        setLong: (state, action) => {
            state.long = action.payload;
        },
        setLocationError: (state, action) => {
            state.locationError = action.payload;
        }
    }
});

export const { setLat, setLong, setLocationError } = locationSlice.actions

export default locationSlice.reducer;

