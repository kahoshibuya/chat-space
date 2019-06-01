$(function() {
  function buildHTML(message) {
    
    var imgHTML = message.image ? "" :`<image class="lower-message__image" src="${message.image}">`;

    var new_message = `<div class="message" data-id=${message.id}>
                        <div class="upper-info">
                        <div class="upper-info__user">${message.name} </div>
                        <div class="upper-info__date">${message.time} </div>
                      </div>
                      <div class="message__text">
                        <p class ="message__text__content">${message.content}</p> 
                        ${imgHTML}
                      </div>`
    return new_message;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var message_messages_id = $('#message_messages').attr('value')
    var url = `/groups/${ message_messages_id }/messages/`
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ 
      var html = buildHTML(data);
      // ajaxのリクエストが成功
      $('.messages-box').append(html);
      $('.input-box__text').val('');
      $('#new_message')[0].reset();
      $('.messages-box').animate({scrollTop: $('.messages-box')[0].scrollHeight});
    })
    .fail(function(){
      // ajaxのリクエストが失敗
      alert('メッセージを送信できません');
    })
    .always(function() {
      $('.submit-btn').prop('disabled', false);
    })
  });
  var reloadMessages = function(){
    // もしこのページのgroupsとmessagesが一致してたら
    if (location.href.match(/\/groups\/\d+\/messages/)){
      // message-boxの最後のデータのidをlast_message_idにする(今見ているやつの最新情報)
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: 'api/messages',// 飛ばすとこ
        type: 'get',//メゾットを指定
        dataType: 'json',//データはjson形式
        data: {id: last_message_id}//引き渡すデータのidはlast_message_id
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages-box').append(html);
          console.log(html);
          $('.messages-box').animate({scrollTop: $('.messages-box')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  }
  // reloadMessages
  setInterval(reloadMessages,5000)
})