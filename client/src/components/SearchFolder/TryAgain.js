import React from 'react';
import { Link } from 'react-router-dom';
import tryagain from '../../ImagesFolder/tryagain.jpg'

const TryAgain = () => {
  return (
    <div className="py-10 px-5 mx-0 min-w-full flex flex-col text-center">
        <h1>
            Sorry! No restaurants were found matching your selected criteria. Please try adjusting the price range and category.
        </h1>
        <Link to="/">  
            <button className="mt-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white ">Search Again</button>
        </Link>
        <img className="mx-auto 2xl:w-6/12 xl:w-6/12 lg:w-5/12 md:w-5/12 sm:w-5/12 xs:w-4/12 " src={tryagain}></img>

    </div>
  )
}

export default TryAgain