import React from 'react'
import { Link } from 'react-router-dom'


const BookmarkCard = ({yelp_url, restaurant_image, note_id, user_id, bookmark_id, restaurant_name, personal_note, setUpdateAfterDelete}) => {
 

  function handleDelete(){                                              

        fetch(`/restaurants/${bookmark_id}`, {
            method: "DELETE",
        })
        .then(setUpdateAfterDelete)
    }

  // const showAddButton = personal_note?.personal_note.length > 0 ? "hidden" : "" 
  // const showEditButton = personal_note?.personal_note.length > 0 ? "" : "hidden" 
const apostId = restaurant_name.split(" ").join("")
const andhover = apostId.replace("&","A");
  const idhover = andhover.replace("'","A");
const newidhover = `#${idhover}`

  const linkAddEdit = personal_note?.personal_note.length > 0 ? `myBookmarks/${note_id}` : `addNote/${bookmark_id}`
const showAddEddit =  personal_note?.personal_note.length > 0 ? "Edit Note" : "Add Note" 
// const showIcon =  personal_note?.personal_note.length > 0 ? "/images/pencil.png" : "/images/add.png" 
const fontAwesome = personal_note?.personal_note.length > 0 ? "fa-regular fa-pen-to-square" : "fa-regular fa-note-sticky"

  return (

//       <div className="col-sm-3">

//         <div className="card">
//           <div className="card-header">
//             <h5 className="card-title">{restaurant_name}</h5>

//           </div>
//           <button id="bookmark-close" type="button" className="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target={newidhover}></button>
//           <div className="modal fade" id={idhover} aria-labelledby="closeModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="exampleModalLabel" >Confirm Delete</h1>
//                 </div>
//               <div className="modal-body" >
//                 Are you sure you want to delete your bookmark for <span style={{ fontWeight: 'bold' }}>{restaurant_name}</span>?
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                 <button  type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <img src={restaurant_image} className="card-img-top" alt={restaurant_name}/>

//           <ul className="list-group list-group-flush">
//             <li className="list-group-item"> 
//               <p className="card-text"> {personal_note?.personal_note}</p>
//               <Link to={linkAddEdit}>
//                 <button id="close-CSS" >{showAddEddit}
//                 {/* <img src={showIcon} alt={showIcon} ></img> */}
//                 <i className= {fontAwesome}></i>
//                 </button>
//             </Link>
//             </li>
//             <li className="list-group-item" id="hover-option"> 
//               <a href={yelp_url} target="_blank" rel="noreferrer">
//              <button className="btn btn-primary" id="yelp-CSS"><img src="/images/yelp.png" alt="/images/yelp.png"></img>Yelp Page </button>
             
//              </a>

//               <Link to={`/createEvent/${bookmark_id}`}>
//                   <button className="btn btn-primary" id="google-CSS"><img src="/images/google-calendar.png" alt="/images/google-calendar.png"></img>Create Event</button>
//               </Link>

//             </li>

//           </ul>
//     </div>
//   </div>
<div class="mt-3 mb-3 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
    <h5 class="text-center border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant_name}</h5>
    <img class="w-full h-52 object-cover" src={restaurant_image} alt="" />

    <div class="">
        <h5 class="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 mb-2 text-l tracking-tight text-gray-900 dark:text-white">Tips, tricks, things to remember</h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
</div>
  )
}

export default BookmarkCard