const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookedAppointmentSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },

    // user
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],

    caregiver: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },

  { timestamps: true }
);

module.exports = bookedAppointmentSchema;
