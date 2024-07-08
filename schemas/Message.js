const mongoose = require('mongoose');
const { Schema } = mongoose;
const MessageSchema = new Schema({
  _user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  _group_chat: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'GroupChats'
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
    minlength: 1,
  },
  url_images: {
    type: [String],
    default: null,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.models.Message || mongoose.model('Messages', MessageSchema);

module.exports = { Message }

