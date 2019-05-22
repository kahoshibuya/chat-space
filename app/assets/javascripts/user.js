$(function() {
var search_list = $(".chat-group-form__input");


function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザー名</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
              </div>`
  search_list.append(html);
}

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: ,
      data: { keyword: input },
      dataType: 'json'
    })

  .done(function(users) {
    $(".chat-group-form__search.clearfix").empty();
    if (user.length !== 0) {
      users.forEach(function(users){
        appendUser(user);
      })
    }
    else {
      appendErrMsgToHTML("ユーザー検索に失敗しました");
    }
  })
  })
});