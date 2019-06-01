class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      # 最新の情報(last_message_id)を探してきて@new_messageに代入してjson形式で返す
      format.json{@new_message = @messages.where('id > ?',params[:id]) }
      format.html
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end
end