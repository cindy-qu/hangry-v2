import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ locationError, lat, long }) => {
    let navigate = useNavigate()

    const [cuisine, setCuisine] = useState("")
    const [dataYelp, setDataYelp] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleCuisine = (e) => {
        setCuisine(e.target.value)
    }
    // const handleLocation = (e) => {
    //     setLocation(e.target.value)
    //  }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setRedirect(true)
        // this.props.dispatch({ type: "SEARCH_LOC", payload: this.state.location })
        // this.props.dispatch({ type: "SEARCH_CUISINE", payload: this.state.cuisine })
        // this.setState({ location: "", cuisine: "" });
        // console.log("cuisine", this.state.cuisine)
        // console.log("location", this.state.location)
        handleClick(cuisine, lat, long)
    }

    function fetchRestaurant (cuisine, lat, long)  {
         const data = {cuisine: cuisine, latitude: lat, longitude: long}
        fetch("http://localhost:3000/api/v1/search", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json()
        .then((info) => { setDataYelp(info.businesses)}
        ))
   
        .then(console.log(dataYelp,lat,long))
        return dataYelp

        
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

    useEffect(() => {
        fetchRestaurant()
        
    },[])

    const handleClick = async (e) => {
     
        const restaurantArray = await fetchRestaurant(cuisine, lat, long)

        function generateRandomRestaurant(min = 1, max = 5) {
            return (Math.floor(Math.random() * (max - min)) + min).toString()
        }


          navigate(`/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`)

        // history.push(`/restaurants/${restaurantArray[generateRandomRestaurant()]?.id}`)

    }
  return (
    <div >
        <p>Get a restaurant based on your location, price range, and category!</p>
        <div className = "search ">
            <form onSubmit={handleSubmit}> 
                <input type="text" name="food" onChange={handleCuisine} placeholder="What are you craving?"/>
                {/* <input type="text" name="loc" onChange={handleLocation} placeholder="location.." /> */}
                <button className="px-3 py-1 rounded-lg bg-sky-700 text-white"type="submit">Search</button>
                
            </form>
        {/* <p>Get a restaurant only based on your location!</p>
            <form onSubmit={handleSubmit}> 
                <input type="submit" value="Feeling Adventurous!" />
            </form> */}
    
        </div>
        <div className = "bg-cover bg-center bg-no-repeat md:h-[600px] bg-[url('./ImagesFolder/searchimage.jpg')]">

        </div>
    </div>
  )
}

export default Search