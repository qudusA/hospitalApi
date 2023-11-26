const UserModel = require("../models/user");

exports.getBookedAppointment = async (req, res, next) => {
  const { userId } = req.params;

  const userInstance = await UserModel.findById(userId).populate({
    path: "patient",
    populate: {
      path: "",
    },
  });
};

exports.getPersonalInfo = async (req, res, next) => {
  next();
};

exports.postAddMedication = async (req, res, next) => {
  next();
};
