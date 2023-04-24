class BookmarkSerializer < ActiveModel::Serializer
  attributes :id, :personal_note, :user_id, :restaurant_id
  has_one :user
  has_one :restaurant
end
