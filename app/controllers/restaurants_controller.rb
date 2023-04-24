class RestaurantsController < ApplicationController
    def index
        restaurants = Restaurant.all
        render json: restaurants, status: :ok
    end

    def show
        restaurant = Restaurant.find(params[:id])
        render json: restaurant, status: :ok
    end

    def create
        restaurant = Restaurant.create!(restaurant_params)
        render json: restaurant, status: :created
    end

    def update
        restaurant = Restaurant.find(params[:id])
        restaurant.update!(restaurant_params)
        render json: restaurant
    end

    def destroy
        restaurant = Restaurant.find(params[:id])
        restaurant.destroy
        head :no_content
    end

    private

    def restaurant_params()
        params.permit(:restaurant_name, :restaurant_image, :yelp_url, :bookmark_id, :user_id)
    end
end
