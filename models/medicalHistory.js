const mongoose = require("mongoose");

const medication = require("./medications");

const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema(
  {
    weight: {
      type: String,
      required: true,
    },

    Dob: {
      type: Date,
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

    patient: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    caregiver: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },

    medications: [medication],
  },
  { timestamps: true }
);

module.exports = medicalHistorySchema;
