const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  // medicalhistory: [medicalHistory],
  bookedappointment: [
    {
      type: Schema.Types.ObjectId,
      ref: "BookedAppointment",
    },
  ],
});

module.exports = mongoose.model("Patients", patientSchema);
