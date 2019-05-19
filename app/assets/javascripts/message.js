$(function() {
  function buildHTML(data) {
    var new_message = `<div class="input-box">
                <p class="input-box__text">${message.content} </p>
                <p class="upper-info__date">${message.time} <p>
                <p class ="message__text__content">${message.body} </p> 
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
    .done(function(date){ 
      var html = buildHTML(data);
      // ajaxのリクエストが成功
      console.log('success!'); 
      console.log(date); 
      var html = new_message(date); 
      $('.messages').append(html);
      $('.input-box__text').val('');   
      $('.messages').animate({scrollTopposition}, speed, 'swing');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(date){
      // ajaxのリクエストが失敗
      console.log('error!');
    });
  });
})
    


