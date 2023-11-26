const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader || authHeader === "") {
      return res.status(401).json({
        error: "unAuthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === " ") {
      return res.status(401).json({
        error: "unAuthorized",
      });
    }

    let verifiedToken;
    try {
      verifiedToken = jwt.verify(token, "mySerectIsSuperSuperSecretive");
    } catch (err) {
      return next(err);
    }

    req.userId = verifiedToken.userId;
    req.isAuth = true;

    next();
  } catch (err) {
    return next(err);
  }
};
