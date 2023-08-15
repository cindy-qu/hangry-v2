import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navVisible = isNavOpen
    ? "w-full md:block md:w-auto"
    : "hidden w-full md:block md:w-auto";

  const navigate = useNavigate();

  function handleLogoutUser() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  const handleSignUser = (e) => {
    navigate("/login");
  };

  const logOut = !user ? (
    <button
      className="px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white inline-flex items-center"
      onClick={handleSignUser}
    >
      Sign In
    </button>
  ) : (
    <button
      className="px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white inline-flex items-center"
      onClick={handleLogoutUser}
    >
      Logout
    </button>
  );

  return (
    <div className="border-gray-200 bg-purple-background dark:bg-gray-800 dark:border-gray-700 text-purple-font">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/search" className="flex items-center">
          <svg
            fill="#365ca4"
            className="inline w-7 h-8 pr-2"
            viewBox="0 -0.5 122.88 122.88"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M29.03,100.46l20.79-25.21l9.51,12.13L41,110.69C33.98,119.61,20.99,110.21,29.03,100.46L29.03,100.46z M53.31,43.05 c1.98-6.46,1.07-11.98-6.37-20.18L28.76,1c-2.58-3.03-8.66,1.42-6.12,5.09L37.18,24c2.75,3.34-2.36,7.76-5.2,4.32L16.94,9.8 c-2.8-3.21-8.59,1.03-5.66,4.7c4.24,5.1,10.8,13.43,15.04,18.53c2.94,2.99-1.53,7.42-4.43,3.69L6.96,18.32 c-2.19-2.38-5.77-0.9-6.72,1.88c-1.02,2.97,1.49,5.14,3.2,7.34L20.1,49.06c5.17,5.99,10.95,9.54,17.67,7.53 c1.03-0.31,2.29-0.94,3.64-1.77l44.76,57.78c2.41,3.11,7.06,3.44,10.08,0.93l0.69-0.57c3.4-2.83,3.95-8,1.04-11.34L50.58,47.16 C51.96,45.62,52.97,44.16,53.31,43.05L53.31,43.05z M65.98,55.65l7.37-8.94C63.87,23.21,99-8.11,116.03,6.29 C136.72,23.8,105.97,66,84.36,55.57l-8.73,11.09L65.98,55.65L65.98,55.65z" />
            </g>
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Hangry
          </span>
        </a>
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={navVisible} id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <NavLink
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/search"
              >
                Search
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/myBookmarks"
              >
                Bookmarks
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/about"
              >
                About
              </NavLink>
            </li>
            {/* <li>
          <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
        </li> */}
            <li>{logOut}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
