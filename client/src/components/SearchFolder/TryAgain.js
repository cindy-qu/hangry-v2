import React from 'react'
import { Link } from 'react-router-dom'

const TryAgain = () => {
  return (
    <div>
        <h1>
            Sorry! No restaurants were found matching your selected criteria. Please try adjusting the price range and category.
        </h1>
    <Link to="/">  
        <button >Search Again</button>
    </Link>
    </div>
  )
}

export default TryAgain