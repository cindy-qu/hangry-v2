import React, { useRef, useState  } from 'react'

import Home from "../Home"
import NavBar from "../NavBar"

const Landing = () => {
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
  const ref = useRef(null); 

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }
  const styles = {
    header: {
      backgroundImage: 'url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      
    },
  
    content: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(204, 223, 250, 0.8)',  
      
    }
  }
  return (
    // <div className="opacity-50  bg-cover bg-bottom   bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-full bg-[length:70rem] 
    // sm:bg-[length:85rem]
    // md:bg-[length:100rem] 
    // lg:bg-[length:115rem] 
    // xl:bg-[length:130rem] 
    // 2xl:bg-[length:135rem]
    // bg-[url('./ImagesFolder/ali-inay-y3aP9oo9Pjc-unsplash.jpg')] 
    // ">


  //   <div style={styles.header}>
  //   <div style={styles.content} >
  //     <h1 className="font-nunito text-9xl font-black text-dark-color pt-20 pl-20">Hangry</h1>
  //     <h2 className="font-nunito text-4xl font-bold text-dark-color pt-10 pl-20" >Can't decide where to get ...
  //               <span className="text-1">breakfast</span>
  //               <span className="text-2">lunch</span>
  //               <span className="text-3">dinner</span>  
  //               <span className="text-4">tacos</span>  
  //               <span className="text-5">sushi</span>  
  //               <span className="text-6">pizza</span>
  //               <span className="text-7">sandwiches</span>  
  //               <span className="text-8">ramen</span>   

  //     </h2>
  //     <h2 className="font-nunito text-4xl font-bold text-dark-color pt-10 pl-20">Let Hangry decide for you!</h2>
  //     <button onClick = {handleClick} className="font-nunito px-3 py-1 rounded-lg  text-4xl bg-sky-700 hover:bg-sky-800 text-white ml-20 mt-10">Enter </button>
  //     <div className="h-[calc(100vh-456px)]"></div>
  //     <NavBar />
  //       <Home ref={ref} getUserCoordinates={getUserCoordinates} locationError={locationError} lat={lat} long={long}/>
      
  //     </div>
  // </div>
  
  <div style={styles.header}>
  <div style={styles.content} >
    
    <h1 className="font-nunito 
    text-7xl sm:text-8xl md:text-9xl  xl:text-9xl 2xl:text-9xl
    font-black text-dark-color pt-20 text-center">
      
    <svg fill="#223966" className="w-10 h-10 mx-auto" viewBox="0 -0.5 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" >
      <g>
        <path d="M29.03,100.46l20.79-25.21l9.51,12.13L41,110.69C33.98,119.61,20.99,110.21,29.03,100.46L29.03,100.46z M53.31,43.05 c1.98-6.46,1.07-11.98-6.37-20.18L28.76,1c-2.58-3.03-8.66,1.42-6.12,5.09L37.18,24c2.75,3.34-2.36,7.76-5.2,4.32L16.94,9.8 c-2.8-3.21-8.59,1.03-5.66,4.7c4.24,5.1,10.8,13.43,15.04,18.53c2.94,2.99-1.53,7.42-4.43,3.69L6.96,18.32 c-2.19-2.38-5.77-0.9-6.72,1.88c-1.02,2.97,1.49,5.14,3.2,7.34L20.1,49.06c5.17,5.99,10.95,9.54,17.67,7.53 c1.03-0.31,2.29-0.94,3.64-1.77l44.76,57.78c2.41,3.11,7.06,3.44,10.08,0.93l0.69-0.57c3.4-2.83,3.95-8,1.04-11.34L50.58,47.16 C51.96,45.62,52.97,44.16,53.31,43.05L53.31,43.05z M65.98,55.65l7.37-8.94C63.87,23.21,99-8.11,116.03,6.29 C136.72,23.8,105.97,66,84.36,55.57l-8.73,11.09L65.98,55.65L65.98,55.65z"/>
      </g>

    </svg>
    Hangry</h1>
    

    <h2 className="font-nunito font-bold text-dark-color 
    pt-10 
    text-left 
    text-xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl
    pl-8 sm:pl-24 md:pl-32 lg:pl-60 xl:pl-72 2xl:pl-96" >
      Can't decide where to get ...
              <span className="text-1">breakfast</span>
              <span className="text-2">lunch</span>
              <span className="text-3">dinner</span>  
              <span className="text-4">tacos</span>  
              <span className="text-5">sushi</span>  
              <span className="text-6">pizza</span>
              <span className="text-7">waffles</span>  
              <span className="text-8">ramen</span>   

    </h2>

    <h2 className="font-nunito 
    text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl
    font-bold text-dark-color text-center 
    pt-10 2xl:pt-20
    ">Let Hangry decide for you!</h2>
    <div className="flex justify-center">
    <button onClick = {handleClick} className="font-nunito font-bold px-7 py-2 rounded-lg  text-2xl bg-sky-700 hover:bg-sky-800 text-white mt-20">
      Enter <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

    </button>
    
    </div>


    <div className="h-[calc(100vh-460px)] sm:h-[calc(100vh-504px)] m:h-[calc(100vh-510px)] lg:h-[calc(100vh-545px)] xl:h-[calc(100vh-545px)] 2xl:h-[calc(100vh-604px)]"></div>
    <NavBar />
      <Home ref={ref} getUserCoordinates={getUserCoordinates} locationError={locationError} lat={lat} long={long}/>
    
    </div>
    
</div>
  )
}

export default Landing