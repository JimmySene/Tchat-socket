const {Server} = require('ws');

const ws_server = new Server({ port:8080 });

// le serveur reçois des events "connection" à chaque fois qu'un socket client est créé avec l'adresse du serveur

// on va ajouter à l'objet socket des eventListener

// exmeple creation socket client : const client = new WebSocket('ws://localhost:8080')
ws_server.on('connection', (socket) => {
  console.log('Nouvelle connexion !');
  // raccourci de .addEventListener
  socket.on('message', (message) => {
    // on  renvoit le message au client
    //envoi du message au client qui a envoyé : socket.send(message);
    // .send est un raccourci à .emit('message', message)
    
    // envoi à tous les utilisateurs connectés au ws
    ws_server.clients.forEach(client => client.send(message));
  } );
});

