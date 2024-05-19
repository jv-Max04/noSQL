const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
let user = prompt("Digite seu nome");

form.addEventListener('submit', (e) => {
  const date = new Date();
  const hora = ((date.getUTCHours() - 3 + 24) % 24) + ":" + String(date.getUTCMinutes()).padStart(2, '0');
  e.preventDefault(); 
  if (input.value) {
      console.log(hora.toString())
      socket.emit('chat message', input.value, user, hora.toString()); 
      input.value = '';
  }
});   

socket.on('chat message', (msg,usuario,horaenvio) => {
  const item = document.createElement('li');
  console.log(horaenvio);
  item.innerHTML = `<p><b>${horaenvio} ${usuario}:</b> ${msg}<p>`;
  messages.appendChild(item);
  document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
});

socket.on('existentes', (msgs) => {
  msgs.forEach((msg) => {
    const item = document.createElement('li')
    item.innerHTML = `<p><b>${msg.hora} ${msg.user}:</b> ${msg.msg}<p>`;
    messages.appendChild(item);
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight);
  });
});

