import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location";
import userReducer from "./user";
import updateReducer from "./user";
import searchReducer from "./searchParams";

export default configureStore({
  reducer: {
    geoLocation: locationReducer,
    userInfo: userReducer,
    update: updateReducer,
    searchParams: searchReducer,
  },
});
