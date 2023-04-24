class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :personal_note, presence: true, length: { maximum: 100 }
end
