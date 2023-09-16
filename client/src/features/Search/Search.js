import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCuisine, setPrice, setRadius } from "../../store/searchParams";

//loading icon import
import { Ring } from '@uiball/loaders'

const Search = ({ postcode, locationError, lat, long }) => {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { cuisine } = useSelector((state) => state.searchParams);
  const { price } = useSelector((state) => state.searchParams);
  const { radius } = useSelector((state) => state.searchParams);

  const message = postcode || locationError
  const [options, setOptions] = useState(false)
  const [loading, setLoading] = useState(false);
  const loadClassSearch = !loading ? (
    <p>Go!</p>
  ) : (
    <div className="flex justify-center">
      <Ring 
      size={23}
      lineWeight={7}
      speed={2} 
      color="white" 
      />
    </div>
  );

  const [loadingAdventure, setLoadingAdventure] = useState(false);
  const loadAdventureClassSearch = !loadingAdventure ? (
    <p>Feeling Adventurous</p>
  ) : (
    <p>
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </p>
  );

  const handleCuisine = (e) => {
    dispatch(setCuisine(e.target.value));
  };
  const handlePrice = (e) => {
    dispatch(setPrice(e.target.value));
  };

  const handleRadius = (e) => {
    dispatch(setRadius(e.target.value))
}
const handleOptions = () => {
    setOptions(prevState => {
        return !prevState
    })

}


  async function fetchRestaurant(cuisine, lat, long, price) {
    setLoading(true);
    const data = {
      cuisine: cuisine,
      latitude: lat,
      longitude: long,
      price: price,
    };
    console.log(data)
    let response = await fetch("https://hangryv2.onrender.com/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responseJson = await response.json();
    return responseJson.businesses;
  }

  
  function generateRandomPrice(min = 1, max = 4) {
    return (Math.floor(Math.random() * (max - min)) + min).toString();
  }
  async function fetchAdventureRestaurant(lat, long) {
    setLoadingAdventure(true);
    const data = {
      cuisine: "cuisine",
      latitude: lat,
      longitude: long,
      price: generateRandomPrice(),
    };
    let response = await fetch("https://hangryv2.onrender.com/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responseJson = await response.json();
    return responseJson.businesses;
  }

  // async function getLocation() {
  //   const response = await fetch(
  //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`,
  //   );

  //   if (!response.ok) {
  //     throw new Error("Couldn't get location");
  //   }
  //   const data = await response.json();
  //   setPostcode(data?.address?.postcode);
  //   console.log(postcode);
  // }

  const handleClick = async (e) => {
    e.preventDefault();
    if(lat === null & long === null){
      handleToggle();
    } else {
      const restaurantArray = await fetchRestaurant(cuisine, lat, long, price);

      function generateRandomRestaurant(
        min = 0,
        max = restaurantArray?.length - 1,
      ) {
        return (Math.floor(Math.random() * (max - min)) + min).toString();
      }
  
      if (restaurantArray.length > 0) {
        navigate(
          `/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`,
        );
      } else {
        navigate(`/tryagain`);
      }
    }
    
  };

  const handleAdventureClick = async (e) => {
    e.preventDefault();
    const restaurantArray = await fetchAdventureRestaurant(lat, long);

    function generateRandomRestaurant(
      min = 0,
      max = restaurantArray?.length - 1,
    ) {
      return (Math.floor(Math.random() * (max - min)) + min).toString();
    }

    if (restaurantArray.length > 0) {
      navigate(
        `/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`,
      );
    } else {
      navigate(`/tryagain`);
    }
  };

  // const handleLocation = () => {
  //   getLocation();
  // };

  const [visible, setVisible] = useState(true);
  const visibleLocation = visible ? "invisible" : "";

  const handleToggle = (e) => {
    setVisible(false);
  };

  const closeToggle = (e) => {
    setVisible(true);
  };

  return (
    <div className="bg-cover bg-bottom bg-no-repeat h-[calc(100vh-64px)] w-full bg-[length:64rem] 
    sm:bg-[length:85rem]
    md:bg-[length:100rem] 
    lg:bg-[length:115rem] 
    xl:bg-[length:130rem] 
    2xl:bg-[length:135rem]
    bg-[url('./assets/8505.jpg')] ">
        <div className="
        max-w-[1400px]
        flex 
        flex-col 
        items-left 
        justify-between 
        mx-auto 
        p-4
        
        ">

        <div className={visibleLocation}>
          <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="flex justify-between  bg-gray-200 px-8 py-6">
                  <h1>
                    Oops, we can't find your location
                  </h1>
                  <button onClick={closeToggle}  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                
                <h2 className="px-8 py-4">Make sure you click <b>Allow</b> or <b>Grant Permissions</b> if your browser asks for your location and refresh the page. If your browser doesn't ask you, try these steps:</h2>
                <div className="px-8 py-4">
                <ol className="bg-gray-200 px-10 py-4 list-decimal" >
                  <li>At the top of your Chrome window, near the web address, click the <b>gray lock icon</b>.</li>
                  <li>In the window that pops up, make sure <b>Location</b> is set to <b>Ask (default)</b> or <b>Allow</b>.</li>
                  <li>You're good to go! Reload the page and try your search again.</li>
                </ol>
                </div>

                <p className="px-8 py-4">If you're still having trouble, check out <a href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=en&oco=0" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noreferrer">Google's support page</a>. You can also search near a city, place, or address instead.</p>

              
              </div>
            </div>
          </div>
        </div>
            <div className="w-full md:w-1/2">
                <div className="relative text-left pt-6 mt-10 mb-6">
                    <p className="text-2xl font-semibold">Get a restaurant based on your location, price range, and category!</p>
                </div>

                <div className="flex flex-col">

                        <form className=" grid grid-cols-9" onSubmit={handleClick}>
                        <div  className="h-10 p-2 object-left col-start-1 col-end-5 bg-white rounded-l-lg outline outline-1 outline-[#ced4da]">
                          <p required className="truncate text-slate-400">{message}</p>
                            {/* <input type="text" placeholder={locationMessage} disabled/> */}
                        </div>
                            <input className="h-10 p-2 col-start-5 col-end-9 text-slate-500 outline outline-1 outline-[#ced4da]" type="text" name="food" onChange={handleCuisine} value={cuisine} placeholder="Which type of cuisine?" autoComplete = "off" required/>
                            
                            <button className="h-10 p-1 rounded-r-lg bg-sky-700 hover:bg-sky-800 text-white items-center outline outline-1 outline-[#ced4da]" type="submit">
                            {loadClassSearch}
                            </button>
                        </form>

                    <div className="row-start-3  text-xs pt-1">
                    <button className="h-8 p-2 mt-4 rounded-full bg-sky-700 hover:bg-sky-800 text-white items-center" onClick={handleOptions}>More Options</button>
                    </div>
                </div>
                

                <div className="text-xs py-3">
                    <div className={options ? "" : "invisible"}>
                        <select className="h-7 px-2 rounded-md outline outline-1 outline-[#ced4da]" value={price} onChange={handlePrice} required>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                        <select className="h-7 px-2 mx-2 rounded-md outline outline-1 outline-[#ced4da]" value={radius} onChange={handleRadius} required>
                            <option value="5">5 mi</option>
                            <option value="10">10 mi</option>
                            <option value="15">15 mi</option>
                            <option value="25">25 mi</option>
                        </select>
                    </div>

                </div>
                {/* <p className="pt-10">Get a restaurant only based on your location!</p>
                <div className = "flex justify-center ">
                    <button className="mt-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white inline-flex items-center" onClick={handleAdventureClick}>
                        {loadAdventureClassSearch}
                    </button>   
                </div>   */}
            </div>
        </div>
        </div>
  )
};

export default Search;
