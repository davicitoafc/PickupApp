Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, :controllers => { registrations: 'registrations',
    :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users, :only => [:show]
  resources :games
  get "/pages/:page" => "pages#show"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
