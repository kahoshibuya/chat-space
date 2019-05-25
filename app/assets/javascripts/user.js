$(function() {
var search_list = $(".chat-group-form__input");

function appendUser(user) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id ='chat-group-users'>
                <input name='group[user_ids][]' type='hieen' value=${id}>
                <p class="chat-group-user__name">${name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name="${name}">追加</div>
              </div>`
  // search_list.append(html);
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
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(users){
          var html = appendUser(user);
          result.append(html)
          $('.users').append(html);
        })
      }
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
  })
});