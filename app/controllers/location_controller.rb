

class LocationController < ApplicationController
  skip_before_action :authorize
  
    def city
        results = Geocoder.search([params[:latitude], params[:longitude]])
        user_location = results.first
        render json: user_location
    end
end
