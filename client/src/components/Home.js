import React from 'react';
import Search from './SearchFolder/Search';


const Home = ({ getUserCoordinates, locationError, lat, long }) => {
  return (
    <div className="flex justify-center">
        <Search locationError={locationError} lat={lat} long={long} />
    </div>
  )
}

export default Home