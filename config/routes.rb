Rails.application.routes.draw do
  get 'games/index'

  get 'games/new'

  get 'games/show'

  root 'home#index'

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, :only => [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
