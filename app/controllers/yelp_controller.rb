require "json"
require "optparse"

class YelpController < ApplicationController
  skip_before_action :authorize
  
    def search
        rest_cuisine = params[:cuisine]
        rest_latitude = params[:latitude]
        rest_longitude = params[:longitude]
        rest_price = params[:price]
        rest_radius = params[:radius]
        response = RestClient::Request.execute(
          method: "GET",
          url: "https://api.yelp.com/v3/businesses/search?term=#{rest_cuisine}&latitude=#{rest_latitude}&longitude=#{rest_longitude}&price=#{rest_price}&radius=#{rest_radius}&limit=20",
          headers: { Authorization: "Bearer #{ENV["YELP_KEY"]}" }
        )
          results = JSON.parse(response)
          render json: results
    end

    def restaurantsDetail
        rest_yelpId = params[:yelpID]
        response = RestClient::Request.execute(
          method: "GET",
          url: "https://api.yelp.com/v3/businesses/#{rest_yelpId}",
          headers: { Authorization: "Bearer #{ENV["YELP_KEY"]}" }
        )
          results = JSON.parse(response)
          render json: results
    end

      
end
