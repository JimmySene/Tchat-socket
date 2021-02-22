const app = {
  init: () => {
    app.socket = new WebSocket('ws://localhost:8080');
    app.socket.addEventListener('message', app.messageReceived);
    document.getElementById('sendMessage').addEventListener('click', app.sendMessage);
  },

  messageReceived: (event) => {
    const data = JSON.parse(event.data);
    const pseudo = data.pseudo;
    const message = data.message;
    
    const li = document.createElement('li');
    li.textContent = pseudo + ' : ' + message;
    document.getElementById('messages').appendChild(li);
    
  },

  sendMessage: (event) => {
    event.preventDefault();
    const inputPseudo = document.getElementById('pseudo').value;
    const inputMessage = document.getElementById('message').value;
    if(inputPseudo != '' && inputMessage != '') app.socket.send(JSON.stringify({pseudo:inputPseudo, message:inputMessage}));
  }
}

document.addEventListener('DOMContentLoaded', app.init);