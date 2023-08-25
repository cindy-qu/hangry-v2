

class LocationController < ApplicationController
  skip_before_action :authorize
  
    def city
        results = Geocoder.search([params[:latitude], params[:longitude]])
        user_city = results.first.city
        user_state = results.first.state
        render json: user_city + ", " + user_state
    end   
end
