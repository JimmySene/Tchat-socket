require('dotenv').config();

const express = require('express');
const app = express();

const {Server} = require('ws');

const ws_server = new Server({ port:8080 });

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connexion DB établie !'))
.catch(error => console.log(error));

const Message = require('./models/Message');

ws_server.on('connection', (socket) => {

  console.log('Nouvelle connexion !');

  Message.find().then(messages => {
    socket.send(JSON.stringify(messages));
  })
  .catch(error => console.log(error));
  
  socket.on('message', (message) => {

    Message.create(JSON.parse(message)).then(() => {
      ws_server.clients.forEach(client => client.send(message));
    })
    .catch(error => console.log(error));
  
  });
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3500);

