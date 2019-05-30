$(function() {
  function buildHTML(message) {
    var imgHTML = (message.image == null)
                ?("")
                :(`<image class="lower-message__image" src="${message.image}">`);

    var new_message = `<div class="message">
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
      $('.messages').append(html);
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

  var reloadMessages = (function(){
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $('.timeline__body').animate({scrollTop: $('.timeline__body')[0].scrollHeight}, 'fast');
      last_message_id = $('.messages:last').data('id');
    $.ajax({
      url: location.href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      var insertHTML = buildHTML(message)
      data.forEach(function(messages) {
        var html = buildHTML(message)
        append(html)
        $('.messages-box').animate({scrollTop: $('.messages-box')[0].scrollHeight});
      })
      console.log('success');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
    } else {
      clearInterval(interval);
    }
  } , 5000 );
})