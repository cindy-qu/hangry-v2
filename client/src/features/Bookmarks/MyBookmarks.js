import React, { useEffect, useState } from "react";
import LoginContainer from "../../components/auth/LoginContainer";
import BookmarkList from "./BookmarkList";

const MyBookmarks = ({
  user,
  setUser,
  restaurantBookmarks,
  setUpdateAfterBookmark,
  setUpdateBookmarkNote,
  setUpdateAfter,
  setUpdateAfterAdding,
  user2,
  setUpdateAfterDelete
}) => {
  // const [user2, setUser2] = useState(null);
  // const [updateAfterDelete, setUpdateAfterDelete] = useState(false);
  // // const [updateAfterBookmark, setUpdateAfterBookmark] = useState([])

  // useEffect(() => {
  //   fetch("/me").then((res) => {
  //     if (res.ok) {
  //       res.json().then((userData) => {
  //         setUser2(userData);
  //         setUpdateAfterBookmark(userData);
  //       });
  //     }
  //   });
  // }, [updateAfterDelete]);

  if (!user) return <LoginContainer setUser={setUser} />;
  return (
    <div>
      <h1 className="text-center text-3xl">My Bookmarks</h1>
      <BookmarkList
        user_id={user.id}
        bookmarks={user2?.restaurants}
        setUpdateAfterDelete={setUpdateAfterDelete}
        restaurantBookmarks={restaurantBookmarks}
        setUpdateBookmarkNote={setUpdateBookmarkNote}
        setUpdateAfter={setUpdateAfter}
        setUpdateAfterBookmark={setUpdateAfterBookmark}
        setUpdateAfterAdding={setUpdateAfterAdding}
      />
    </div>
  );
};

export default MyBookmarks;
