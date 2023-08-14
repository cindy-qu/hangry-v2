import React, { useState } from 'react'
import { Link, useParams} from 'react-router-dom'

const AddBookmarkNote = ({ user, setUpdateBookmarkNote }) => {
    const [createPersonalNote, setCreatePersonalNote] = useState("Tips, tricks, things to remember") 
    // const [restaurantBookmarkDetail, setRestaurantBookmarkDetail] = useState([]);
    const [errors, setErrors] = useState([]);
    const [updated, setUpdated] = useState(false);
    const paramsObj = useParams()
    const paramsId = parseInt(paramsObj.id)

    const handleCreateNote = (e) => {
        const formData = {
          personal_note: createPersonalNote,
          user_id: user.id,
          restaurant_id: paramsId
        }
      
        fetch(`/bookmarks`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
      })
  
      
      .then((res) => {
        if (res.ok) {
          res.json().then((userData) => {
            setUpdateBookmarkNote(userData)
            setUpdated(updated => !updated)
          });
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
      }) 
      }

      const editMsgClassName = updated ? '' : 'hidden';
      const formErrorMsg = errors.map((err) => (
        <p key={err}>{err}</p>
        ))


  return (
    <div className="text-center">
      <h1 className="text-3xl">Add Note</h1>
    
      <textarea
      className="w-64 bg-white rounded-md outline outline-1 outline-[#ced4da]" 
      id="exampleFormControlTextarea1" 
      rows="4"
      value={createPersonalNote}
      onChange={(e)=>{ setCreatePersonalNote(e.target.value) }}
       />
       <br></br>
    <button className='ml-3 mr-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white' id="addnote" onClick={handleCreateNote} >Add Note</button>
    <ul>{formErrorMsg}</ul>
    <div id="edit-complete-msg" className={editMsgClassName}>
                <h3>Note Added!</h3>
                <Link to="/myBookmarks">
                  <button className='ml-3 mr-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white'>View My Bookmarks
                  </button>
                </Link>
        </div>
    </div>
  )
}

export default AddBookmarkNote