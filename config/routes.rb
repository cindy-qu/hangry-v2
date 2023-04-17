Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      get '/yelp', to: 'yelp#fetch'
      post '/search', to: 'yelp#search'
      post '/restaurants', to: 'yelp#restaurants'
    end
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
