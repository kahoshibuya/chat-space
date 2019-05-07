Rails.application.routes.draw do
  devise_for :users
  get 'index' => 'messages#index'
  resources :users, only: [:edit, :update]
end
