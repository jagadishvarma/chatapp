var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var listun = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  socket.on('user name', function(name){
    listun.push(name);
    socket.username = name;
    io.emit('user name', name);
    io.emit('listun', listun);
  });
  socket.on('disconnect', function(){
    var index = listun.indexOf(socket.username);
    listun.splice(index, 1);
    io.emit('listun', listun);
    io.emit('disconnected', socket.username);
  });

  socket.on('chat message', function(msg){
    io.emit('send message', msg);
  });
});


http.listen(process.env.PORT ||3000, function(){
  console.log('listening on *:3000');
});
