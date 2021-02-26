const app = {
  init: () => {
    app.socket = new WebSocket('ws://localhost:8080');
    app.socket.addEventListener('message', app.messageReceived);
    document.getElementById('sendMessage').addEventListener('click', app.sendMessage);
  },

  messageReceived: (event) => {
    const data = JSON.parse(event.data);

    if(Array.isArray(data)) {
      
      data.forEach(message => {
        
        const li = document.createElement('li');
        li.textContent = message.pseudo + ' : ' + message.message;
        document.getElementById('messages').prepend(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = data.pseudo + ' : ' + data.message;
      document.getElementById('messages').prepend(li);
    }
      
  },

  sendMessage: (event) => {
    event.preventDefault();
    const inputPseudo = document.getElementById('pseudo').value;
    const inputMessage = document.getElementById('message').value;
    if(inputPseudo != '' && inputMessage != '') app.socket.send(JSON.stringify({pseudo:inputPseudo, message:inputMessage}));
    document.getElementById('message').value = '';
  }
}

document.addEventListener('DOMContentLoaded', app.init);