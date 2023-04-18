require "json"
require "optparse"

class Api::V1::YelpController < ApplicationController
    def search
        rest_cuisine = params[:cuisine]
        rest_latitude = params[:latitude]
        rest_longitude = params[:longitude]
        rest_price = params[:price]
        response = RestClient::Request.execute(
          method: "GET",
          url: "https://api.yelp.com/v3/businesses/search?term=#{rest_cuisine}&latitude=#{rest_latitude}&longitude=#{rest_longitude}&price=#{rest_price}&limit=20",
          headers: { Authorization: "Bearer #{ENV["YELP_KEY"]}" }
        )
          results = JSON.parse(response)
          render json: results
    end

    def restaurants
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
