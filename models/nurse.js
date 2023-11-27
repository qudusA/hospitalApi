const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nurseSchema = new Schema({
  nurseId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Nurse", nurseSchema);
