import React, { forwardRef } from 'react';
import Search from './SearchFolder/Search';


const Home = ({ getUserCoordinates, locationError, lat, long}, ref) => {
  return (
    <div className=" bg-cover bg-bottom   bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-full bg-[length:64rem] 
     sm:bg-[length:85rem]
     md:bg-[length:100rem] 
     lg:bg-[length:115rem] 
     xl:bg-[length:130rem] 
     2xl:bg-[length:135rem]
     bg-[url('./ImagesFolder/8505.jpg')] 
     "
     ref={ref}
     >
      <Search locationError={locationError} lat={lat} long={long} />
      
    </div>

  )
}

export default forwardRef(Home);