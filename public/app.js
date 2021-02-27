const app = {

  baseUrl: '',

  init: () => {
    app.getMessages();
    app.socket = new WebSocket('ws://localhost:8080');
    app.socket.addEventListener('message', app.messageReceived);
    document.getElementById('sendMessage').addEventListener('click', app.sendMessage);
  },

  getMessages: async () => {
    try {
      const data = await fetch(`${app.baseUrl}/messages`);
      const messages = await data.json();
      messages.forEach(message => app.makeMessage(message));
      
    } catch(error) {
      console.log(error);
    }
  },

  messageReceived: (event) => {
    const data = JSON.parse(event.data);
    app.makeMessage(data);
  },

  sendMessage: (event) => {
    event.preventDefault();
    const inputPseudo = document.getElementById('pseudo').value;
    const inputMessage = document.getElementById('message').value;
    if(inputPseudo != '' && inputMessage != '') app.socket.send(JSON.stringify({pseudo:inputPseudo, message:inputMessage}));
    document.getElementById('message').value = '';
  },

  makeMessage: (message) => {
    const li = document.createElement('li');
    li.textContent = message.pseudo + ' : ' + message.message;
    document.getElementById('messages').prepend(li);
  }
}

document.addEventListener('DOMContentLoaded', app.init);