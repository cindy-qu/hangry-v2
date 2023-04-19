import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="bg-purple-background ">
        <div className="flex text-left py-4 text-purple-font">
            <NavLink className=" font-semibold text-2xl px-4" to="/search">
                Hangry
            </NavLink>
            <NavLink className="px-2 pt-1" to="/search">
                Search
            </NavLink>
            <NavLink className="px-2 pt-1" to="/myBookmarks">
                Bookmarks
            </NavLink>
            <NavLink className="px-2 pt-1" to="/about">
                About
            </NavLink>            
        </div> 
    </div>
  )
}

export default NavBar