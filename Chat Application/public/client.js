const socket = io();
const user = { name: '' };
const input = document.getElementById('textarea');
const msgArea = document.querySelector('.message__area');
const dropdown = document.getElementById('dropdown');
const typingIndicator = document.getElementById('typing-indicator');
var selectedItem = '';

let friendId = [];

dropdown.addEventListener('change', () => {
  selectedItem = dropdown.options[dropdown.selectedIndex].value;
  console.log(`Selected item: ${selectedItem}`);
});

function validName() {
  user.name = prompt('Enter your name');
  if (user.name.trim() === '' || user.name.trim() === null) {
    validName();
  } else {
    socket.emit('user name', user);
  }
}

validName();

input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    socket.emit('userTyping', { userName: user.name });
  } else {
    socket.emit('userStoppedTyping');
  }
});

socket.on('typingIndicator', (typingUser) => {
  if (typingUser) {
    typingIndicator.textContent = `${typingUser} is typing...`;
  } else {
    typingIndicator.textContent = '';
  }
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const msg = {
      message: input.value.trim(),
      name: user.name,
      friendId: ''
    };


    // socket.emit('chat', msg);
    // appendMessages(user.name, msg.message, 'outgoing');
    // console.log('in chat 1');
    // input.value = '';

    msg.friendId = selectedItem;

    if (selectedItem === '') {
      socket.emit('chat', msg);
      appendMessages(user.name, msg.message, 'outgoing');
      console.log('in chat 1');
      input.value = '';
    }else{
      socket.emit('private',msg);
      appendMessages(user.name, msg.message, 'private outgoing');
      input.value = '';

      console.log(msg);
    }
  }
});

socket.on('leave', (data) => {
  const leave = document.createElement('div');
  const leaveText = `<h4>${data} has left the chat !</h4>`;
  leave.innerHTML = leaveText;
  leave.style.color = 'red';
  leave.style.display = 'flex';
  leave.style.justifyContent = 'center';
  leave.style.alignItems = 'center';
  friendId.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.text = user.name;
    dropdown.appendChild(option);
  });

  msgArea.appendChild(leave);
});

socket.on('user join', (data) => {
  const join = document.createElement('div');
  const text = `<h4>${data} has joined the chat !</h4>`;
  join.innerHTML = text;
  join.style.color = 'black';
  join.style.display = 'flex';
  join.style.justifyContent = 'center';
  join.style.alignItems = 'center';

  msgArea.appendChild(join);
});

socket.on('chat', (data) => {
  if (user.name !== data.name) {
    appendMessages(data.name, data.message, 'incoming');
  }
});

socket.on('privateMessage', (data) => {
    appendMessages(data.name, data.message, 'private incoming');
});


function appendMessages(name, msg, type) {
  const mainDiv = document.createElement('div');
let markup = `<h4>${name}</h4>
              <p>${msg}</p>`;

if (type === 'outgoing') {
  mainDiv.style.color = 'blue';
  mainDiv.style.textAlign = 'right';
} else if (type === 'incoming') {
  mainDiv.style.color = 'green';
  mainDiv.style.textAlign = 'left';
} else if (type === 'private incoming') {
  markup = `<h4>${name}--> ${user.name}</h4>
            <p>Private message: ${msg}</p>`;
  mainDiv.style.color = 'orange';
  mainDiv.style.textAlign = 'left';
} else if (type === 'private outgoing') {
  markup = `<h4>${name}</h4>
            <p>Private message: ${msg}</p>`;
  mainDiv.style.color = 'orange';
  mainDiv.style.textAlign = 'right';
}

  mainDiv.innerHTML = markup;
  msgArea.appendChild(mainDiv);
}

socket.on('friendList', (data) => {
  friendId.length = 0;
  friendId = data;
  updateFriendList();
});

function updateFriendList() {
  // Clear existing options from the dropdown
  dropdown.innerHTML = '';

  // Add default option for "everyone"
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Everyone';
  dropdown.appendChild(defaultOption);

  friendId.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.text = user.name;
    dropdown.appendChild(option);
  });
}
