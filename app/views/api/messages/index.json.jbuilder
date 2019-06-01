# 配列を回して値を返す(取得するメッセージが複数ある時もあるから配列で返す→array!)
# 最新の情報(@new_message)をjson形式で返す
# - binding.pry
json.array! @new_message do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
end
