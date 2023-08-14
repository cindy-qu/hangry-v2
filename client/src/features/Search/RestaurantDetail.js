import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

const RestaurantDetail = ({user}) => {
    const [restaurantDetail, setRestaurantDetail] = useState([]);
    const [bookmarkDetail, setBookmarkDetail] = useState([]);
    const [errors, setErrors] = useState([]);
    const [updated, setUpdated] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    
    const [modal, setModal] = useState(false);

    const modalClass = modal ? "fixed z-10 overflow-y-auto top-0 w-full left-0" : "hidden fixed z-10 overflow-y-auto top-0 w-full left-0"

    const modalLogToggle = () => {
      setModal(false);
      navigate('/login');
    }
    const modalSignToggle = () => {
      setModal(false);
      navigate('/signup');
    }
    const handleBookmarkClick = () => {
      if (!user){
        setModal(true);

      } else {
        handleBookmark();
      }
    }

      useEffect(() => {
        const searchApi = async () => {
        const data = {yelpID: params.id}
        fetch("https://hangryv2.onrender.com/restaurantsDetail", {
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
    user_id: user.id,
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

const ratingPlaceholder = newnumber ? newnumber : 0

const formErrorMsg = errors?.map((err) => (
  <p key={err}>{err}</p>
  ))

const editMsgClassName = updated ? '' : 'hidden';


  return (
    <div className=" bg-cover bg-bottom bg-no-repeat  h-[calc(100vh-64px)] overflow-auto w-full bg-[length:70rem] 
    sm:bg-[length:85rem]
    md:bg-[length:100rem] 
    lg:bg-[length:115rem] 
    xl:bg-[length:130rem] 
    2xl:bg-[length:120rem]
    sm:bg-[url('./assets/restaurantimg.jpg')] 
    ">
      <div className="my-4 sm:my-8 
                      pb-4 sm:pb-8 
                      justify-center 
                      mx-auto 
                      sm:max-w-sm xl:max-w-xl 2xl:max-w-2xl
                      bg-white 
                      sm:border 
                      sm:border-gray-200 
                      sm:rounded-lg 
                      sm:shadow 
                      sm:dark:bg-gray-800 
                      sm:dark:border-gray-700 ">

        <h2 className="text-center text-2xl pb-4 mt-2 sm:mt-4">{restaurantDetail?.name}</h2>
        <img className=" mx-auto rounded-md w-64 max-h-64 2xl:max-h-fit " src={restaurantDetail?.image_url} alt={restaurantDetail?.name}/>
        <div className="text-center pt-4">
          <ul >Yelp Rating: <img className="mx-auto" src={`/images/small_${ratingPlaceholder}.png`} alt={restaurantDetail?.rating}></img></ul>
          <ul className="flex justify-center pt-3">Price Range: {restaurantDetail?.price}</ul>
          <ul className="justify-center">Address: {locationMap}</ul>
          <a href={restaurantDetail?.url} target="_blank" rel="noreferrer">
          <button className="mt-2 px-3 py-1 rounded-lg bg-sky-700 text-white">Yelp Page</button>
        </a>
        <br></br>
        <button onClick={handleBookmarkClick} className="mt-2  px-3 py-1 rounded-lg bg-sky-700 text-white" id = "buttonbookmark" >Bookmark for Later</button>
        <ul>{formErrorMsg}</ul>

        <div className={modalClass} id="modal">
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                <label>Log in or Sign up to Bookmark Restaurants!</label>

              </div>
              <div className="bg-gray-200 px-4 py-3 text-center">
                <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={modalLogToggle}>Log In</button>
                <button type="button" className="py-2 px-4 bg-sky-700 text-white rounded hover:bg-sky-800 mr-2" onClick={modalSignToggle}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>


            <div id="edit-complete-msg" className={editMsgClassName}>
                      <h3>Bookmarked!</h3>
                      <Link to="/myBookmarks">
                        <button className="py-2 px-4 bg-sky-700 text-white rounded hover:bg-sky-800 mr-2">View My Bookmarks
                        </button>
                      </Link>
              </div>
        </div>
      </div>
    </div>

  )
}

export default RestaurantDetail