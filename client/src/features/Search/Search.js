import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCuisine, setPrice } from "../../store/searchParams";

//loading icon import
import { Ring } from '@uiball/loaders'

const Search = ({ locationError, lat, long }) => {
  const [postcode, setPostcode] = useState(null);
  const locationMessage = postcode ? postcode : "Get Location";
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { cuisine } = useSelector((state) => state.searchParams);
  const { price } = useSelector((state) => state.searchParams);
  const [radius, setRadius] = useState("10")
  const [options, setOptions] = useState(false)
  const [loading, setLoading] = useState(false);
  const loadClassSearch = !loading ? (
    <p>Search</p>
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
    setRadius(e.target.value)
}
const handleOptions = () => {
    setOptions(prevState => {
        return !prevState
    })
    console.log(options);
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

  async function getLocation() {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`,
    );

    if (!response.ok) {
      throw new Error("Couldn't get location");
    }
    const data = await response.json();
    setPostcode(data?.address?.postcode);
  }

  const handleClick = async (e) => {
    e.preventDefault();
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

  const handleLocation = () => {
    getLocation();
  };

  return (
    <div className="
    max-w-[1400px]
    max-h-full
    flex 
    flex-col 
    items-left 
    justify-between 
    mx-auto 
    p-4
     ">
        <div className="
        grid
        gap-4
        grid-cols-2
        grid-rows-6">
            <div className="row-start-2 text-left pt-6">
                <p className="text-2xl font-semibold">Get a restaurant based on your location, price range, and category!</p>
            </div>
    {/*         
            <div className="flex justify-center py-0.5 rounded-md outline outline-1 outline-[#ced4da] mt-3">
                <svg width="20px" height="20px" viewBox="-1.5 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ced4da" fillRule="evenodd" d="M574,120 C575.324428,120 580,114.054994 580,110.833333 C580,107.611672 577.313708,105 574,105 C570.686292,105 568,107.611672 568,110.833333 C568,114.054994 572.675572,120 574,120 Z M574,113.333333 C575.420161,113.333333 576.571429,112.214045 576.571429,110.833333 C576.571429,109.452621 575.420161,108.333333 574,108.333333 C572.579839,108.333333 571.428571,109.452621 571.428571,110.833333 C571.428571,112.214045 572.579839,113.333333 574,113.333333 Z" transform="translate(-568 -105)"/>
                </svg>
                <input  type="text"placeholder={userLocation} disabled/>
            </div> */}
            <div className="row-start-3 flex flex-col">
                <div className = "row-start-3">
                    <form className=" grid grid-cols-9" onSubmit={handleClick}>
                    <div onClick={handleLocation} className="h-10 p-2 object-left col-start-1 col-end-5 bg-white rounded-l-lg outline outline-1 outline-[#ced4da]">
                        {/* <svg width="20px" height="20px" viewBox="-1.5 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ced4da" fillRule="evenodd" d="M574,120 C575.324428,120 580,114.054994 580,110.833333 C580,107.611672 577.313708,105 574,105 C570.686292,105 568,107.611672 568,110.833333 C568,114.054994 572.675572,120 574,120 Z M574,113.333333 C575.420161,113.333333 576.571429,112.214045 576.571429,110.833333 C576.571429,109.452621 575.420161,108.333333 574,108.333333 C572.579839,108.333333 571.428571,109.452621 571.428571,110.833333 C571.428571,112.214045 572.579839,113.333333 574,113.333333 Z" transform="translate(-568 -105)"/>
                        </svg> */}
                        <input type="text" placeholder={locationMessage} disabled/>
                    </div>
                        <input className="h-10 p-2 col-start-5 col-end-9 outline outline-1 outline-[#ced4da]" type="text" name="food" onChange={handleCuisine} placeholder="Which type of cuisine?" autoComplete = "off" required/>
                        
                        <button className="h-10 p-2 rounded-r-lg bg-sky-700 hover:bg-sky-800 text-white items-center outline outline-1 outline-[#ced4da]" type="submit">
                        {loadClassSearch}
                        </button>
                    </form>
                </div>
                <div className="row-start-3  text-xs">
                <button class="h-8 p-2 mt-4 rounded-full bg-sky-700 hover:bg-sky-800 text-white items-center" onClick={handleOptions}>More Options</button>
                </div>
            </div>
            

            <div className="row-start-4 text-xs">
                <div className={options ? "" : "invisible"}>
                    <select className="h-7 px-2 rounded-md outline outline-1 outline-[#ced4da]" value={price} onChange={handlePrice} required>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>
                    <select className="h-7 px-2 mx-2 rounded-md outline outline-1 outline-[#ced4da]" value={price} onChange={handleRadius} required>
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
  )
};

export default Search;
