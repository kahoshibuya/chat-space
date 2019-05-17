FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUfB3Ub5Ew3vYjrIaPWduApdWbh28dQPz-4cIfXnA4kUofnzHMkw")}
    user
    group
  end
end