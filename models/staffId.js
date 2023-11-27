const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffIdSchema = new Schema({
  staffId: {
    type: String,
    required: true,
  },

  fullName: {
    type: "String",
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  hasBol: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("StaffId", staffIdSchema);
