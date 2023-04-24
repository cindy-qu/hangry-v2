import React from 'react'
import BookmarkCard from './BookmarkCard.js'

const BookmarkList = ( {restaurantBookmarks2, restaurantBookmarks, bookmarks, setUpdateAfterDelete, user_id } ) => {
// console.log(bookmarks)

   const renderBookmarkCard = bookmarks?.map((bookmark)=>{
    return (
        <BookmarkCard 
        key={bookmark.id}
        bookmark_id={bookmark.id}
        restaurant_name={bookmark.restaurant_name}
        restaurant_image={bookmark.restaurant_image}
        yelp_url={bookmark.yelp_url}
        personal_note={bookmark.bookmarks[0]}
        note_id = {bookmark?.bookmarks[0]?.id}
        setUpdateAfterDelete={setUpdateAfterDelete}
        user_id={user_id}
        />
    )
   
   })
  return (
    <div className ="row" id="bookmarkcard">
        {/* <h1>BookmarkList</h1> */}
        {renderBookmarkCard}
    </div>
  )
}

export default BookmarkList