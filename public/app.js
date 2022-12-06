let socket = io();

// Setup username
let name;
if (!localStorage.getItem('name')) {
  name = prompt('What is your name?')
  localStorage.setItem('name', name)
} else {
  name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name;

// Change username
document.querySelector('#change-name').addEventListener('click', () => {
  name = prompt('What is your name?')
  localStorage.setItem('name', name)
  document.querySelector('#name').innerText = name
})

socket.emit('join', { name });

socket.on('team', ({ name }) => {
  const toastLiveExample = document.getElementById('liveToast')
  const toastMessage = document.querySelector('.toast-body');
  toastMessage.innerText = `${name} has joined the team!`;
  const toast = new bootstrap.Toast(toastLiveExample)

  toast.show()
});

socket.on('message', ({name, msg}) => {
  let message = document.createElement('div');
  message.innerHTML = `
    <p class="name">${name}</p>
    <p>${msg}</p>
  `;

  document.querySelector('#messages').prepend(message);
  // window.scrollTo(0, document.body.scrollHeight);
}); 

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault()

  let message = document.querySelector('#message-input').value
  socket.emit('chatMessage', {name, msg: message});
}); 
