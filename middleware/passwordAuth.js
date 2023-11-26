// const userModel = require("../models/user");
const UserModel = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    console.log(UserModel);
    const userInstance = await UserModel.findOne({ _id: userId });
    console.log(userInstance);
    console.log(userInstance?.isValid);
    if (!userInstance?.isValid) {
      return res.status(401).json({
        error: "unAuthorized",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
