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
}) => {
  function handleDelete() {
    fetch(`/restaurants/${bookmark_id}`, {
      method: "DELETE",
    }).then(setUpdateAfterDelete);
  }

  const apostId = restaurant_name.split(" ").join("");
  const andhover = apostId.replace("&", "A");
  const idhover = andhover.replace("'", "A");

  const linkAddEdit =
    personal_note?.personal_note.length > 0
      ? `editNote/${note_id}`
      : `addNote/${bookmark_id}`;
  const showAddEddit =
    personal_note?.personal_note.length > 0 ? "Edit Note" : "Add Note";
  const fontAwesome =
    personal_note?.personal_note.length > 0
      ? "fa-regular fa-pen-to-square"
      : "fa-regular fa-note-sticky";

  const [visible, setVisible] = useState(true);
  const visibleBookmark = visible ? "invisible" : "";

  const handleToggle = (e) => {
    console.log("hi");
    setVisible(false);
  };

  const closeToggle = (e) => {
    setVisible(true);
  };

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

      <div className="mb-3">
        <h5 className="text-center border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 mb-2 text-l tracking-tight text-gray-900 dark:text-white">
          {personal_note?.personal_note}
          <br></br>
          <Link to={linkAddEdit}>
            <button id="close-CSS">
              {showAddEddit}
              <i className={fontAwesome}></i>
            </button>
          </Link>
        </h5>

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
