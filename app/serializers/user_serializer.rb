class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :restaurants
  has_many :bookmarks
end
