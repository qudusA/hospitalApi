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

    Dob: {
      type: Date,
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

    staff: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    position: {
      type: String,
      required: function () {
        return this.staff.toLowerCase() === "yes";
      },
    },
    // employeeEmail: String,
    employeeId: {
      type: String,
      required: function () {
        return this.staff.toLowerCase() === "yes";
      },
    },

    specialty: {
      type: String,
      required: function () {
        return this.position.toLowerCase === "doctor";
      },
    },

    //  sent Messages.
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
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
