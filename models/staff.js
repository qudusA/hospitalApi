const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Staffs", staffSchema);
