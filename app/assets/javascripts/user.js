$(function() {
var search_list = $("#user-search-result");
var member_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function addHTML(id,name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url : '/users',
      data: { keyword: input },
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(users) {
      $("#user-serch-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        })
      }
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
  })

  $('#user-search-result').on('click','.user-search-add',function(e){
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    var html = addHTML(id,name);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });
  $(document).on("click", '.js-remove-btn', function() {
    $(this).parent().remove();
  })
});