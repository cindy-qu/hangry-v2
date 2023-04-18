import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ locationError, lat, long }) => {
    let navigate = useNavigate()

    const [cuisine, setCuisine] = useState("")
    const [price, setPrice] = useState("1")
    // const [dataYelp, setDataYelp] = useState('')
    const [loading, setLoading] = useState(false)
    const loadClassSearch = !loading ? 
        <p>Search</p> : 
        <p>
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Loading...
        </p>
    
    const [loadingAdventure, setLoadingAdventure] = useState(false)
    const loadAdventureClassSearch = !loadingAdventure ? 
    <p>Feeling Adventurous</p> : 
    <p>
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...
    </p>


    const handleCuisine = (e) => {
        setCuisine(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    // const handleLocation = (e) => {
    //     setLocation(e.target.value)
    //  }
    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setRedirect(true)
    //     // this.props.dispatch({ type: "SEARCH_LOC", payload: this.state.location })
    //     // this.props.dispatch({ type: "SEARCH_CUISINE", payload: this.state.cuisine })
    //     // this.setState({ location: "", cuisine: "" });
    //     // console.log("cuisine", this.state.cuisine)
    //     // console.log("location", this.state.location)
    //     handleClick(cuisine, lat, long)
    // }

    async function fetchRestaurant (cuisine, lat, long, price)  {
         setLoading(true)
         const data = {cuisine: cuisine, latitude: lat, longitude: long, price: price}
            let response = await fetch("http://localhost:3000/api/v1/search", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        // .then((res)=> {setLoading(false)})

        let responseJson = await response.json()
        return responseJson.businesses
        // .then(res => res.json()
        // .then((info) => { setDataYelp(info.businesses)}
        // ))
   
        // .then(console.log(dataYelp,lat,long))
        // return  dataYelp

        
        // const data = {cuisine: cuisine, location: location };
        // console.log(data)
        // return fetch("http://localhost:3000/api/v1/search", {
        // method: "POST",
        // mode: 'no-cors',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(data),
        // })

        // .then(res => res.json())
        // .then(data => console.log("Printing data: ", data));
        // // .then(results => this.props.dispatch({ type: "SEARCH_RESULTS", payload: results }))
    }
    function generateRandomPrice(min = 1, max = 4) {
        return (Math.floor(Math.random() * (max - min)) + min).toString()
      }
    async function fetchAdventureRestaurant ( lat, long)  {
        setLoadingAdventure(true)
        const data = {cuisine: 'cuisine', latitude: lat, longitude: long, price: generateRandomPrice()}
           let response = await fetch("http://localhost:3000/api/v1/search", {
           method: "POST",
           headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(data)
       })
       // .then((res)=> {setLoading(false)})

       let responseJson = await response.json()
       return responseJson.businesses
       // .then(res => res.json()
       // .then((info) => { setDataYelp(info.businesses)}
       // ))
  
       // .then(console.log(dataYelp,lat,long))
       // return  dataYelp

       
       // const data = {cuisine: cuisine, location: location };
       // console.log(data)
       // return fetch("http://localhost:3000/api/v1/search", {
       // method: "POST",
       // mode: 'no-cors',
       // headers: {
       //     'Accept': 'application/json',
       //     'Content-Type': 'application/json',
       // },
       // body: JSON.stringify(data),
       // })

       // .then(res => res.json())
       // .then(data => console.log("Printing data: ", data));
       // // .then(results => this.props.dispatch({ type: "SEARCH_RESULTS", payload: results }))
   }

    // useEffect(() => {
    //     fetchRestaurant()
        
    // },[])

    const handleClick = async (e) => {
        e.preventDefault();
        const restaurantArray = await fetchRestaurant(cuisine, lat, long, price)

        function generateRandomRestaurant(min = 0, max = restaurantArray?.length - 1) {
            return (Math.floor(Math.random() * (max - min)) + min).toString()
        }

        if (restaurantArray.length > 0) {
            navigate(`/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`)
        } else {
            navigate(`/tryagain`)
        }
          

       

    }

    const handleAdventureClick = async (e) => {
        e.preventDefault();
        const restaurantArray = await fetchAdventureRestaurant(lat, long)

        function generateRandomRestaurant(min = 0, max = restaurantArray?.length - 1) {
            return (Math.floor(Math.random() * (max - min)) + min).toString()
        }

        if (restaurantArray.length > 0) {
            navigate(`/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`)
        } else {
            navigate(`/tryagain`)
        }
          

       

    }
  return (
    <div >
        <p className = "flex justify-center "> Get a restaurant based on your location, price range, and category!</p>
        <div className = "flex justify-center ">
            <form onSubmit={handleClick}> 
                <select className="rounded-md outline outline-1 outline-[#ced4da]" value={price} onChange={handlePrice} required>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                </select>
                <input className="rounded-md outline outline-1 outline-[#ced4da]" type="text" name="food" onChange={handleCuisine} placeholder="What are you craving?" autoComplete = "off" required/>
                
                <button className="px-3 py-1 rounded-md bg-sky-700 text-white inline-flex items-center" type="submit">
                   {loadClassSearch}
                </button>

                
            </form>

        </div>

        {/* <div className = "bg-cover bg-center bg-no-repeat h-[1000px] bg-[url('./ImagesFolder/searchimage.jpg')]">

        </div> */}
        <button className="px-3 py-1 rounded-md bg-sky-700 text-white inline-flex items-center" onClick={handleAdventureClick}>
            {loadAdventureClassSearch}
        </button>        
    </div>
  )
}

export default Search