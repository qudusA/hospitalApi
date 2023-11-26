const mongoose = require("mongoose");
const bookedAppointment = require("./bookedApointment");
const medicalHistory = require("./medicalHistory");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    country: {
      type: String,
      required: false,
    },

    flag: {
      type: String,
      required: [
        true,
        "kindly tell us who you are, i.e (doctor, patient, caregiver)",
      ],
    },

    bookedappointment: [bookedAppointment],

    medicalhistory: { id: medicalHistory },

    //  sent Messages.
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    //  for doctors
    appointmentCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],

    otp: Number,
    expirationTime: Number,
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
