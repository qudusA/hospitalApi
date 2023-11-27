const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hrSchema = new Schema({
  hrId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Hr", hrSchema);
