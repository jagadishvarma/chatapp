var name = prompt('Please enter your name');
var socket = io();
socket.emit('user name',name);
var flag = 0;
$('form').submit(function(){
  flag = 1;
  var sendmsg = $('#m').val();
  $('#messages').append($('<li>').html(name+"(me): <br>"+sendmsg).css({"text-align": "left","margin": "5px 5px 5px 177px"}));
  socket.emit('chat message', name+" : "+$('#m').val());
  $('#m').val('');
  return false;
});
socket.on('send message', function(msg){
  if(flag == 0){
    $('#messages').append($('<li>').text(msg));
  }
  flag = 0;
});
socket.on('user name', function(uname) {
  if(uname == name){
    $('#messages').append($('<li>').html("hi "+uname+"<br>"+"you are connected").css({"font-size" : "17px" ,"border" : "0","background" : "none"}));
  }
  else {
    $('#messages').append($('<li>').text(uname+" is connected").css({"border" : "0","background" : "none"}));
  }
})
socket.on('disconnected', function(disconnected) {
  $('#messages').append($('<li>').text(disconnected+" is disconnected").css({"border" : "0","background" : "none"}));
});

socket.on('listun', function(listun) {
  listun.toString();
  var n = listun.length;
  $('#peopleon li').remove();
  for(i=0;i<n;i++){
    $('#peopleon').append($('<li>').text(listun[i]));
    $('button.online').text("Online Members("+n+")");
}
});
