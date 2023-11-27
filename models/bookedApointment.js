const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookedAppointmentSchema = new Schema(
  {
    // appointment: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Appointment",
    // },

    // user
    patientId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    ],

    appointmentType: {
      type: String,
      required: true,
      enum: [
        "Routine Check-up/Appointment",
        "Specialist Consultation",
        "Diagnostic Tests/Appointments",
        "Surgical Consultation",
        "Preoperative Assessment",
        "Postoperative Follow-up",
        "Emergency Room (ER) Appointment",
        "Vaccination Appointments",
        "Physical Therapy Appointments",
        "Mental Health Appointments",
        "Prenatal Care Appointments",
        "Wellness and Preventive Care",
        "Chronic Disease Management Appointments",
        "Pediatric Check-ups",
        "Follow-up Appointments",
      ],
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    reasonOfAppointment: {
      type: String,
    },

    HMO: {
      type: String,
      required: true,
      enum: ["yes", "no"],
    },

    HmoName: {
      type: String,
      required: function () {
        return this.HMO.toLowerCase() === "yes";
      },
      enum: ["health parthners", "sunu", "nhis"],
    },

    paymentStatus: {
      type: Boolean,
      default: false,
    },

    ceargiver: {
      type: String,
      // required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("BookedAppointments", bookedAppointmentSchema);
