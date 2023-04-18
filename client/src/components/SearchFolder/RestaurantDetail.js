import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const RestaurantDetail = () => {
    const [restaurantDetail, setRestaurantDetail] = useState([]);
    const [bookmarkDetail, setBookmarkDetail] = useState([]);
    const [errors, setErrors] = useState([]);
    const [updated, setUpdated] = useState(false);

    const params = useParams();
    

      useEffect(() => {
        const searchApi = async () => {
        const data = {yelpID: params.id}
        fetch("http://localhost:3000/api/v1/restaurants", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json()
        .then((info) => { setRestaurantDetail(info)}
        ))
    
        // .then(console.log(dataYelp,lat,long))
        return restaurantDetail
          
      };
     
      searchApi()
    
      }, [])



 const locationAddress = restaurantDetail?.location?.display_address


const locationMap = locationAddress?.map((address) => {
  return (<p className="justify-center" key={address}>{address}</p>)
})



const handleBookmark = (e) => {

  const restaurantData = {
    restaurant_name: restaurantDetail.name,
    // user_id: user.id,
    restaurant_image: restaurantDetail.image_url,
    yelp_url: restaurantDetail.url,
  }

fetch(`/restaurants`, {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(restaurantData)
})
.then((res) => {
  if (res.ok) {
    res.json().then((userData) => {
      setBookmarkDetail(userData)
      setUpdated(updated => !updated)
      // history.push("/myBookmarks")
    });
  } else {
    res.json().then((err) => setErrors(err.errors))
  }
})
}

var newnumber = parseInt(restaurantDetail?.rating?.toString().replace('.', ''))



const formErrorMsg = errors?.map((err) => (
  <p key={err}>{err}</p>
  ))
  const editMsgClassName = updated ? '' : 'hidden';


  return (
    <div className="flex justify-center">
      <div>
        <h2 className="flex justify-center text-xl">{restaurantDetail?.name}</h2>
        <img className="rounded-md w-80" src={restaurantDetail?.image_url} alt={restaurantDetail?.name}/>
        <div>
          <ul >Yelp Rating: <img id="yelp-rating" src={`/images/small_${newnumber}.png`} alt={restaurantDetail?.rating}></img></ul>
          <ul className="flex justify-center">Price Range: {restaurantDetail?.price}</ul>
          <ul className="justify-center">Address: {locationMap}</ul>
        </div>
        <a href={restaurantDetail?.url} target="_blank" rel="noreferrer">
          <button id="buttonyelp" className="px-3 py-1 rounded-lg bg-sky-700 text-white">Yelp Page</button>
        </a>
        <button onClick={handleBookmark} className="px-3 py-1 rounded-lg bg-sky-700 text-white" id = "buttonbookmark" >Bookmark for Later</button>
        <ul>{formErrorMsg}</ul>
            {/* <div id="edit-complete-msg" className={editMsgClassName}>
                      <h3>Bookmarked!</h3>
                      <Link to="/myBookmarks">
                        <button className="btn btn-primary">View My Bookmarks
                        </button>
                      </Link>
              </div> */}
      </div>
    </div>

  )
}

export default RestaurantDetail