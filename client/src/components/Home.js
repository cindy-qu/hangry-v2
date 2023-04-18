import React from 'react';
import Search from './SearchFolder/Search';


const Home = ({ getUserCoordinates, locationError, lat, long }) => {
  return (
    <div>
    <div className="container px-8 py-10 mx-auto bg-cover bg-bottom   bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-screen bg-[length:1200px] bg-[url('./ImagesFolder/8505.jpg')] ">
        <Search locationError={locationError} lat={lat} long={long} />
    </div>
    {/* <div className="bg-cover bg-center bg-no-repeat  h-screen w-screen bg-[length:1000px] bg-[url('./ImagesFolder/8505.jpg')]">

    </div> */}
    </div>
  )
}

export default Home