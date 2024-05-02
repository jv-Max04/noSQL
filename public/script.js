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
  item.innerHTML = `<p><b>${usuario}:</b> ${msg}<p>`;
  messages.appendChild(item);
  document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
});

socket.on('existentes', (msgs) => {
  msgs.forEach((msg) => {
    const item = document.createElement('li')
    item.innerHTML = `<p><b>${msg.user}:</b> ${msg.msg}<p>`;
    messages.appendChild(item);
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
  });
});

