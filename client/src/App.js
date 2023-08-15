import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Landing from "./features/Landing/Landing";
import About from "./components/layout/About";
import RestaurantDetail from "./features/Search/RestaurantDetail";
import TryAgain from "./features/Search/TryAgain";
import MyBookmarks from "./features/Bookmarks/MyBookmarks";
import AddBookmarkNote from "./features/Bookmarks/AddBookmarkNote";
import EditBookmarkCard from "./features/Bookmarks/EditBookmarkCard";
import LoginContainer from "./components/auth/LoginContainer";
import Signup from "./components/auth/Signup";
import Calendar from "./features/Calendar/Calendar";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { setLat, setLong, setLocationError } from "./store/location";
import { setUser } from "./store/user";
import {
  setUpdateAfterDelete,
  setUpdateBookmarkCard,
  setUpdateBookmarkNote,
  setUpdateAfterBookmark,
} from "./store/update";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const { lat } = useSelector((state) => state.geoLocation);
  const { long } = useSelector((state) => state.geoLocation);
  const { locationError } = useSelector((state) => state.geoLocation);

  const { user } = useSelector((state) => state.userInfo);

  const { updateAfterDelete } = useSelector((state) => state.update);
  const { updateBookmarkCard } = useSelector((state) => state.update);
  const { updateBookmarkNote } = useSelector((state) => state.update);
  const { updateAfterBookmark } = useSelector((state) => state.update);

  const [restaurantBookmarks, setRestaurantBookmarks] = useState([]);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  // for scrolling from landing page to search page
  const { pathname } = useLocation();

  // geolocation API
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      dispatch(setLocationError("Geolocation is not enabled!"));
      console.log(locationError);
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          dispatch(setLat(coords.latitude));
          dispatch(setLong(coords.longitude));
        },
        (error) => {
          dispatch(
            setLocationError(
              "Sorry, something went wrong getting your location",
            ),
          );
        },
      );
    }
  };
  getUserCoordinates();

  // automatically login if user_id is in session, load home page
  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          dispatch(setUser(userData));
          fetchRestaurantBookmarks();
        });
      }
    });
  }, [
    updateAfterBookmark,
    updateBookmarkNote,
    updateBookmarkCard,
    updateAfterDelete,
  ]);

  const fetchRestaurantBookmarks = () => {
    fetch(`/restaurants`).then((res) => {
      if (res.ok) {
        res.json().then(setRestaurantBookmarks);
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  };

  return (
    <div className="font-poppins">
      {pathname !== "/" && <NavBar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/search"
          element={
            <Home
              getUserCoordinates={getUserCoordinates}
              locationError={locationError}
              lat={lat}
              long={long}
            />
          }
        />
        <Route
          path="/restaurants/:id"
          element={<RestaurantDetail user={user} />}
        />
        <Route path="/tryagain" element={<TryAgain />} />

        <Route
          path="/myBookmarks"
          element={
            <MyBookmarks
              user={user}
              setUser={setUser}
              setUpdateAfterBookmark={setUpdateAfterBookmark}
              restaurantBookmarks={restaurantBookmarks}
              setUpdateAfterDelete={setUpdateAfterDelete}
            />
          }
        />

        <Route path="/login" element={<LoginContainer setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route
          path="/myBookmarks/editNote/:id"
          element={
            <EditBookmarkCard
              user={user}
              setUpdateBookmarkCard={setUpdateBookmarkCard}
            />
          }
        />
        <Route
          path="/myBookmarks/addNote/:id"
          element={
            <AddBookmarkNote
              user={user}
              setUpdateBookmarkNote={setUpdateBookmarkNote}
            />
          }
        />

        <Route
          exact
          path="/createEvent/:id"
          element={<Calendar user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;
