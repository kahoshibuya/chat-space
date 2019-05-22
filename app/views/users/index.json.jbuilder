json.users do
  json.array! @users do |user|
    json.name @user.name
  end
end