const mongoose = require("mongoose");

const medication = require("./medications");

const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema(
  {
    weight: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    bloodPressure: {
      type: String,
      required: true,
    },

    height: {
      type: String,
      required: true,
    },

    assignedDoctor: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    date: {
      type: Date,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Ptients",
    },

    caregiver: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    medications: [medication],

    // patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    conditions: [{ type: String }],

    allergies: [{ type: String }],

    surgeries: [
      {
        name: { type: String, required: true },
        date: { type: Date },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = medicalHistorySchema;
