import React from "react";
import BookmarkCard from "./BookmarkCard.js";

const BookmarkList = ({
  restaurantBookmarks2,
  restaurantBookmarks,
  bookmarks,
  setUpdateAfterDelete,
  user_id,
  setUpdateBookmarkNote,
  setUpdateBookmarkCard,
  setUpdateAfter,
  setUpdateAfterBookmark,
  setUpdateAfterAdding
}) => {
  // console.log(bookmarks)

  const renderBookmarkCard = bookmarks?.map((bookmark) => {
    return (
      <BookmarkCard
        key={bookmark.id}
        bookmark_id={bookmark.id}
        restaurant_name={bookmark.restaurant_name}
        restaurant_image={bookmark.restaurant_image}
        yelp_url={bookmark.yelp_url}
        personal_note={bookmark.bookmarks[0]}
        note_id={bookmark?.bookmarks[0]?.id}
        setUpdateAfterDelete={setUpdateAfterDelete}
        user_id={user_id}
        setUpdateBookmarkNote={setUpdateBookmarkNote}
        setUpdateBookmarkCard={setUpdateBookmarkCard}
        setUpdateAfter={setUpdateAfter}
        setUpdateAfterBookmark={setUpdateAfterBookmark}
        setUpdateAfterAdding={setUpdateAfterAdding}
      />
    );
  });
  return (
    <div className="mx-8 xs:mx-10 my-8 ">
      <div
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 
        md:gap-1 lg:gap-2 xl:gap-2 2xl:gap-2"
      >
        {renderBookmarkCard}
      </div>
    </div>
  );
};

export default BookmarkList;
