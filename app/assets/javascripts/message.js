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
    })
    .always(function() {
      $('.submit-btn').prop('disabled', false);
    })
  });

  $(function(){
    $(function(){
      setInterval(update, 10000);
    });
    function update(){
        var message_id = $('.messages:last').data('id');
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: location.href,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: message_id}
      })
      .always(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
        $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
          buildMESSAGE(data); //buildMESSAGEを呼び出す
        });
      });
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      });
    };
  })
})