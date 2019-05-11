Rails.application.routes.draw do
  devise_for :users
<<<<<<< Updated upstream
  get 'index' => 'messages#index'
  resources :users, only: [:edit, :update]
=======
  root 'groups#index'
  resources :user, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
>>>>>>> Stashed changes
end
