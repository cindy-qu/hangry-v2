import NavBar from './components/NavBar'
import Home from './components/Home'
import Landing from './components/LandingFolder/Landing'
import About from './components/About'
import RestaurantDetail from './components/SearchFolder/RestaurantDetail'
import TryAgain from './components/SearchFolder/TryAgain'
import './App.css';

import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
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


  return (
    <div className="font-poppins">
      { pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Home getUserCoordinates={getUserCoordinates} locationError={locationError} lat={lat} long={long} />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/tryagain" element={<TryAgain />} />
      </Routes>

    </div>
  );
}

export default App;
