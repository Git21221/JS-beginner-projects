const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const fs = require('fs');

http.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const users = [];

io.on('connection', (socket) => {
  console.log('connected !');

  socket.on('user name', (username) => {
    users.push({
      id: socket.id,
      name: username.name
    });

    console.log(`user ${username.name} is added to the list`);
    io.emit('user join', username.name);
    io.emit('friendList', users);

    let data = `user ${username.name} is joined the chat`;
    storeLog(data);
  });

  socket.on('disconnect', () => {
    let user = deleteId(socket.id);
    console.log('disconnected !', user);
    let data = `user ${user} disconnected !`;
    storeLog(data);
    io.emit('friendList', users);
  });

  socket.on('private', (data) => {
    io.to(data.friendId).emit('privateMessage', data);
  });

  socket.on('chat', (data) => {
    let info = `${data.name} : ${data.message}\n`;
    storeLog(info);
    console.log(`${data.message} :sent by ${data.name}`);
    io.emit('chat', data);
  });


  let typingUser = null;

  socket.on('userTyping', (data) => {
    typingUser = data.userName;
    socket.broadcast.emit('typingIndicator', typingUser);
  });

  socket.on('userStoppedTyping', () => {
    typingUser = null;
    socket.broadcast.emit('typingIndicator', null);
  });

  function deleteId(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      const user = users[index];
      io.emit('leave', user.name);
      users.splice(index, 1);
      return user.name
    }
  }
});


function getCurrentTimeStamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad with leading zeros if needed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return timestamp;
}

function storeLog(data){
  let timestamp = getCurrentTimeStamp();
  data = `[${timestamp}] : ${data}\n`;
  fs.appendFileSync(path.join(__dirname,'log.txt'),data);
  console.log('data store successfully !');
}