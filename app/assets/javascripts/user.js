$(function() {
var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class='chat-group-user clearfix js-chat-member'>
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
  search_list.append(html);
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
          console.log(appendUser);
        })
      }
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
  })
});