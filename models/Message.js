const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  pseudo: String,
  message: String
});

module.exports = mongoose.model('Message', messageSchema, 'messages');