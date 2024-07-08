const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  student_code: {
    type: String,
    unique: true,
    required: true,
    match: /^[A-Z0-9]{10}$/,
    uppercase: true
  },
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^(\+8|0)([0-9]{9})$/,
  },
  url_image: {
    type: String,
    default: null
  },
});

const Users = mongoose.models.Users || mongoose.model  ('Users', UserSchema);

module.exports = { Users }

