const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
let user = prompt("Digite seu nome");

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  if (input.value) {
      socket.emit('chat message', input.value, user);
      input.value = '';
  }
}); 

socket.on('chat message', (msg,usuario) => {
  const item = document.createElement('li');
  item.textContent = `${usuario}: ${msg}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('existentes', (msgs) => {
  msgs.forEach((msg) => {
    const item = document.createElement('li')
    item.textContent = `${msg.user}: ${msg.msg}`;
    messages.appendChild(item);
  });
});