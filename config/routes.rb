Rails.application.routes.draw do
  devise_for :users
  get 'index' => 'messages#index'
end
