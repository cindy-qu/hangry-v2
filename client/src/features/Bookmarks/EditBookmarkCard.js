import React, { useState } from 'react'
import { Link, useParams} from 'react-router-dom'

const EditBookmarkCard = ( {user, setUpdateBookmarkCard} ) => {
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState([]);

    const [personalNote, setPersonalNote] = useState("")
    const paramsObj = useParams()
    const paramsId = parseInt(paramsObj.id)

    // const bookmarkId = user.restaurants
    // let matchPersonalNote = bookmarkId.find(book => book.id === paramsId ? book.id : '')

    // useEffect(() => {
    //     setPersonalNote(matchPersonalNote.personal_note)
    // },[paramsId])

function handleUpdate(e) {
    e.preventDefault()
    fetch(`/bookmarks/${paramsId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            personal_note: personalNote
        }),
    }).then((res) => {
        if (res.ok) {
            res.json().then((updateB) => {
                setUpdateBookmarkCard(updateB)
                setUpdated(updated => !updated)
                // setPersonalNote("")
            });
        } else {
            res.json().then((err) => {
                setErrors(err.errors)
            })
        }
    })
}

const editMsgClassName = updated ? '' : 'hidden';
const formErrorMsg = errors.map((err) => (
    <p key={err}>{err}</p>
    ))

  return (
    <div className="text-center">
        <h1 className="text-3xl">Edit Note</h1>
        <form onSubmit={handleUpdate}>
            <textarea
            className="w-64 bg-white rounded-md outline outline-1 outline-[#ced4da]" 
            id="exampleFormControlTextarea2" 
            rows="4"
            value={personalNote}
            onChange={(e)=>{ setPersonalNote(e.target.value)}} />
            <br></br>
            <button type="submit" className="ml-3 mr-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white" id="editnote">Update Note</button>
        </form>
        <ul>{formErrorMsg}</ul>
        <div id="edit-complete-msg" className={editMsgClassName}>
                <h3>Edit complete!</h3>
                <Link to="/myBookmarks">
                  <button className="ml-3 mr-3 px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white">View My Bookmarks
                  </button>
                </Link>
        </div>
    </div>
  )
}

export default EditBookmarkCard