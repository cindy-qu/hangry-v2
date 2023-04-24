class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_name, :restaurant_image, :yelp_rating, :yelp_url, :price_range
  has_many :bookmarks
  has_one :user
  
end
