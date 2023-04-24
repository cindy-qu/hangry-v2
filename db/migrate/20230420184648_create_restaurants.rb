class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :restaurant_name
      t.string :restaurant_image
      t.integer :yelp_rating
      t.string :yelp_url
      t.string :price_range
      
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
