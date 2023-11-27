const staffIdModel = require("../models/staffId");
const { validationResult } = require("express-validator");

exports.postCreateStaffId = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    const { staffId, fullName, position } = req.body;
    const staffIdInstance = staffIdModel({
      staffId,
      fullName,
      position,
    });

    await staffIdInstance.save();
    res.status(201).json({
      message: "employee id created",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
