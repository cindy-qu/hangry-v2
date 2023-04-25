import React from 'react'


const About = () => {
  return (
    <div className=" bg-cover bg-bottom   bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-full 
    bg-[length:20rem] 
    sm:bg-[length:50rem]
    md:bg-[length:70rem] 
    lg:bg-[length:70rem] 
    xl:bg-[length:75rem] 
    2xl:bg-[length:80rem]
    bg-[url('./ImagesFolder/about.jpg')] 
    ">
      <div className="text-center
                      my-4 sm:my-10
                      px-10
                      sm:pt-8 
                      pb-4 sm:pb-8 
                      justify-center 
                      mx-auto 
                      sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-4xl
                      bg-white 
                      sm:border 
                      sm:border-gray-200 
                      sm:rounded-lg 
                      sm:shadow 
                      sm:dark:bg-gray-800 
                      sm:dark:border-gray-700">
      <h1 className="text-3xl">About</h1>
      <p className="text-base">
        Welcome to Hangry! Can't decide where to eat? Let Hangry pick a restaurant for you! Create an account or log in upon opening the app. Search by price range and category or choose "Feeling Adventurous" and Hangry will choose a restaurant based only on your location. Bookmark any restaurants that interest you. View all your bookmarks and add notes or create a Google calendar event!
      </p> 
      <h2 className="text-3xl  mt-3">Application Coding Details</h2>
      <p>
        This is a fullstack application that utilizes elements of React (Javascript, CSS, HTML, JSX) and Ruby on Rails to create a cohesive front and back end experience. This application is for non-commercial uses only.
      </p>
      <h3 className="text-3xl mt-3">Resources</h3>
      <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://www.freepik.com/author/pch-vector">Images by pch.vector</a> on Freepik</p>
      <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://docs.developer.yelp.com/docs/getting-started">Yelp Fusion API</a></p>
      <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://developers.google.com/calendar/api">Google Calendar API</a></p>
      <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://www.w3schools.com/html/html5_geolocation.asp">HTML Geolocation API</a></p>
      <p>Connect with Me on  </p>
      <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://www.linkedin.com/in/cindy-qu/" target="_blank" rel="noreferrer">
       LinkedIn
        </a>
     
      
      </div>

    </div>
  )
}

export default About