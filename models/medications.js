const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  medicationName: {
    type: String,
    required: true,
  },

  dosage: {
    type: String,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  // deleveryStatus: {
  //   type: String,
  // },

  // report: {
  //   type: String,
  // },
});

module.exports = medicationSchema;
