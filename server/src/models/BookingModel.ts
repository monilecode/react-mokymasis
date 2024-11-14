const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
  ],
  userEmail: {
    type: String,
    required: [true, 'field is required.'],
    validate: {
      validator: function (email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: [true, 'Booking status is required.'],
    enum: {
      values: ['confirmed', 'pending', 'cancelled'],
      message: '{VALUE} is not supported',
    },
  },
  date: {
    type: Date,
    required: [true, 'field is required. e.g. 2022-04-28'],
  },
  time: {
    type: String,
    required: [true, 'field is required. e.g. 14:00'],
  },
});

BookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = { BookingModel };
