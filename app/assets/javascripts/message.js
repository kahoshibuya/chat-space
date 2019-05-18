$(function() {
  // function new_message(message) {
  //   var new_message = '<div class="upper-info">' +
  //               '<p class="upper-info__username">'+ ${message.name} +'</p>' +
  //               '<p class="upper-info__date">'+ ${message.time} + '<p>' +
  //               '<p class ="message__text__content">' + ${message.body} +'</p>' +
  //               '</div>'
  //   return new_message;
  // }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      dataType: 'json',
    })
    .done(function(date){ 
      var html = buildHTML(data);
      // ajaxのリクエストが成功
      console.log('success!'); 
      console.log(date); 
      // var html = new_message(date); 
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
  // function scroll() {
  //   $('.messages').animate({scrollTopposition}, speed, 'swing');
  // }
})
    


