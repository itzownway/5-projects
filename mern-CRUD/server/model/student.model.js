const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  passOutYear: {
    type: Date,
    required: true,
  },
  work: {
    type: String,
    trim: true,
  },
  place: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // store file URL / path
  },
  socialLink: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;
