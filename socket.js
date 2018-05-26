var io = require('socket.io')();
var ctrlChat = require('./app_server/controllers/chat'); 

io.on('connection',function(socket){
    ctrlChat.connect(io,socket);    
    socket.on('disconnect',ctrlChat.disconnect);    //can dissconnet after connected
    socket.on('message',function(msg){ctrlChat.message(msg,io);});  //send message
});

module.exports = io;