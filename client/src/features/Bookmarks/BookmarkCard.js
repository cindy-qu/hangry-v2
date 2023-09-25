import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookmarkCard = ({
  yelp_url,
  restaurant_image,
  note_id,
  user_id,
  bookmark_id,
  restaurant_name,
  personal_note,
  setUpdateAfterDelete,
  setUpdateBookmarkCard,
  setUpdateBookmarkNote,
  setUpdateAfter,
  setUpdateAfterAdding
}) => {
  function handleDelete() {
    fetch(`/restaurants/${bookmark_id}`, {
      method: "DELETE",
    }).then(setUpdateAfterDelete);
  }

  const apostId = restaurant_name.split(" ").join("");
  const andhover = apostId.replace("&", "A");
  const idhover = andhover.replace("'", "A");

//state variable to keep track of user reading or editing a note
const [writing, setWriting] = useState(false);
const handleWriting = (e) => {
  writing ? setWriting(false) : setWriting(true);
};

  const handleToggle = (e) => {
    setVisible(false);
  };

  const closeToggle = (e) => {
    setVisible(true);
  };

  //state variable to store personal note value
  const [noteContent, setNoteContent] = useState("")
  const [errors, setErrors] = useState([]);
  const [updated, setUpdated] = useState(false);
  
  //function creates a brand new note on a bookmark for user
  const handleNoteAdd = (e) => {

    const formData = {
      personal_note: noteContent,
      user_id: user_id,
      restaurant_id: bookmark_id,
    };

    fetch(`/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUpdateBookmarkNote(userData);
          setUpdated((updated) => !updated);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    }).then(setUpdateAfterAdding);
    setWriting(false);
  };

  const handleNoteEdit = () => {

    fetch(`/bookmarks/${note_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personal_note: noteContent,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((updateB) => {
          setUpdateBookmarkNote(updateB);
          setUpdated((updated) => !updated);
          // setPersonalNote("")
        });
      } else {
        res.json().then((err) => {
          setErrors(err.errors);
        });
      }
    }).then(setUpdateAfterAdding);
    setWriting(false);
  }

  //directs user through the add flow or the edit flow depending on if a note already exists
  const addOrEdit =
    personal_note?.personal_note.length > 0
      ? handleNoteEdit
      : handleNoteAdd;
  const showAddEdit =
    personal_note?.personal_note.length > 0
      ? (writing ? "Save " : "Edit ")
      : (writing ? "Save " : "Add Note ")
  const fontAwesome =
    writing
      ? "fa-solid fa-check fa-lg"
      : "fa-regular fa-pen-to-square";

  const [visible, setVisible] = useState(true);
  const visibleBookmark = visible ? "invisible" : "";
  


  // const handleCreateNote = (e) => {
  //   const formData = {
  //     personal_note: noteContent,
  //     user_id: user_id,
  //     restaurant_id: paramsId,
  //   };

  //   fetch(`/bookmarks`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((userData) => {
  //         setUpdateBookmarkNote(userData);
  //         setUpdated((updated) => !updated);
  //       });
  //     } else {
  //       res.json().then((err) => setErrors(err.errors));
  //     }
  //   });
  // };



  return (
    <div className="mt-3 mb-3 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex ">
        <h5 className="flex-1 text-center border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 text-l font-bold tracking-tight text-gray-900 dark:text-white">
          {restaurant_name}
        </h5>
        <button onClick={handleToggle} className="mr-2">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className={visibleBookmark} id={idhover}>
          <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <h1 className="px-8 py-8 ">
                  Are you sure you want to delete your bookmark for{" "}
                  <span className="font-bold">{restaurant_name}</span>?
                </h1>
                <div className="bg-gray-200 px-4 py-3 text-center">
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    onClick={closeToggle}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 bg-sky-700 text-white rounded hover:bg-sky-800 mr-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="w-full h-52 object-cover" src={restaurant_image} alt="" />

      <div className="mb-3 flex flex-col">

          {writing ?
            <div className="h-32 text-slate-950 py-5 flex flex-col items-center justify-center">
              <div className="flex h-1/2 items-center justify-center">
                <textarea className="h-5/6 w-full bg-slate-200 resize-none" 
                  rows="2" 
                  defaultValue={personal_note?.personal_note}
                  onChange={(e) => {
                    setNoteContent(e.target.value);

                  }}>
                </textarea>
              </div>
              <div className="flex h-1/2 items-center justify-center">
                <button className="rounded-full bg-slate-200 text-sm text-slate-500 px-2 py-1" id="close-CSS" onClick={addOrEdit}>
                  {showAddEdit}
                  <i className={fontAwesome}></i>
                </button> 
              </div>
            </div> :
            <div className="h-32 text-slate-950 py-5 flex flex-col items-center justify-center">
              <div className="flex h-1/2 items-center justify-center">
                {personal_note?.personal_note}
              </div>
                <div className="flex h-1/2 items-center justify-center">
                <button className="rounded-full bg-slate-200 text-sm align-middle text-slate-500 px-2 py-1" id="close-CSS" onClick={handleWriting}>
                  {showAddEdit}
                  <i className={fontAwesome}></i>
                </button>
                </div>
            </div>
            }
          {/* <Link to={linkAddEdit}>
            <button className="text-slate-500 text-sm px-2" id="close-CSS">
              {showAddEdit}
              <i className={fontAwesome}></i>
            </button>
          </Link> */}

        <div className="flex justify-center gap-1">
          <a href={yelp_url} target="_blank" rel="noreferrer">
            <button className=" px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white" id="yelp-CSS">
              <img src="/images/yelp.png" className="inline w-4 h-4" alt="/images/yelp.png"></img>Yelp Page 
            </button>
          </a>
          <Link to={`/createEvent/${bookmark_id}`}>
            <button className=" px-3 py-1 rounded-md bg-sky-700 hover:bg-sky-800 text-white">
              <img className="inline w-4 h-4" src="/images/google-calendar.png" alt="google-calendar"></img>Create Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
