import NavBar from './components/NavBar';
import Home from './components/Home';
import Landing from './components/LandingFolder/Landing';
import About from './components/About';
import RestaurantDetail from './components/SearchFolder/RestaurantDetail';
import TryAgain from './components/SearchFolder/TryAgain';
import MyBookmarks from './components/MyBookmarksFolder/MyBookmarks';
import AddBookmarkNote from  './components/MyBookmarksFolder/AddBookmarkNote';
import EditBookmarkCard from './components/MyBookmarksFolder/EditBookmarkCard';
import LoginContainer from './components/LoginFolder/LoginContainer';
import Signup from './components/LoginFolder/Signup';
import Calendar from './components/CalendarFolder/Calendar'

import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [updateAfterDelete, setUpdateAfterDelete] = useState(false)
  const [updateBookmarkCard, setUpdateBookmarkCard] = useState([])
  const [updateBookmarkNote, setUpdateBookmarkNote] = useState([])
  const [updateAfterBookmark, setUpdateAfterBookmark] = useState([])
  const [restaurantBookmarks, setRestaurantBookmarks]=useState([])
  
  const [errors, setErrors] = useState([])

  // for scrolling from landing page to search page
 const { pathname } = useLocation();

  // grab user geolocation
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [locationError, setLocationError] = useState([]);

  // geolocation API
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setLocationError("Geolocation is not enabled!")
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      }, (error) => {
        setLocationError("Sorry, something went wrong getting your location")
      })
    }
  }
  getUserCoordinates();

// user information
  const [user, setUser] = useState(null)

// automatically login if user_id is in session, load home page
useEffect(() => {
  fetch("/me").then((res) => {
    if (res.ok) {
      res.json().then((userData) => {
        setUser(userData);
        fetchRestaurantBookmarks();
      });
    }
  });
}, [updateAfterBookmark, updateBookmarkNote, updateBookmarkCard, updateAfterDelete])

const fetchRestaurantBookmarks = () => {
  fetch(`/restaurants`)
  .then((res) => {
    if (res.ok) {
      res.json().then(setRestaurantBookmarks)
    } else {
      res.json().then(data => setErrors(data.error))
    }
  })
}



  return (
    <div className="font-poppins">
      { pathname !== '/' && <NavBar user={user} setUser={setUser} />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Home getUserCoordinates={getUserCoordinates} locationError={locationError} lat={lat} long={long}/>} />
        <Route path="/restaurants/:id" element={<RestaurantDetail user={user} />} />
        <Route path="/tryagain" element={<TryAgain />} />
        <Route path="/myBookmarks" element={<MyBookmarks user={user} setUser={setUser} setUpdateAfterBookmark={setUpdateAfterBookmark} restaurantBookmarks={restaurantBookmarks} setUpdateAfterDelete={setUpdateAfterDelete}/>} />
        <Route path="/login" element={<LoginContainer setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route path="/myBookmarks/editNote/:id" element={<EditBookmarkCard user={user} setUpdateBookmarkCard={setUpdateBookmarkCard}/>} />
        <Route path="/myBookmarks/addNote/:id"  element={ <AddBookmarkNote user={user} setUpdateBookmarkNote={setUpdateBookmarkNote}/>} />

        <Route exact path="/createEvent/:id" element={ <Calendar user={user} />}/>
        
      </Routes>

    </div>
  );
}

export default App;
