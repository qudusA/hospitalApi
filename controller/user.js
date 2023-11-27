const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const staffIdModel = require("../models/staffId");

const UserModel = require("../models/user");

// exports.postRegisterAS = async (req, res, next)=>{
//   const {position} = req.body;
// if(position === "doctor")
// }

exports.postSignup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      fullName,
      newGender,
      newPhone,
      country,
      staff,
      Dob,
    } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: error.array() });
    }
    const userInstance = await UserModel.findOne({ email });
    if (userInstance)
      return res.status(400).json({ error: "User already exists" });

    let hash;
    try {
      hash = await bcrypt.hash(password, 12);
    } catch (err) {
      console.error("Error during password hashing:", err);
      return next(err); // Properly handle the error by passing it to the next middleware
    }

    let user;
    if (staff === "yes") {
      const { employeeId } = req.body;
      const position = req.position;
      // console.log(position, employeeId);
      user = new UserModel({
        email,
        password: hash,
        fullName,
        gender: newGender,
        phone: newPhone,
        country,
        staff,
        position,
        employeeId,
        Dob,
      });
    } else {
      user = new UserModel({
        email,
        password: hash,
        fullName,
        gender: newGender,
        phone: newPhone,
        country,
        staff,
      });
    }

    const savedUser = await user.save();

    res.json({
      message: "User creation successful",
      user: {
        email: savedUser.email,
      },
    });
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInstance = await UserModel.findOne({ email });
    if (!userInstance) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    let doMatch;
    try {
      doMatch = await bcrypt.compare(password, userInstance.password);
    } catch (err) {
      return next(err);
    }

    if (!doMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    let token;
    try {
      token = jwt.sign(
        { email, userId: userInstance.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      return next(err);
    }

    res.status(200).json({
      message: "Login successful",
      email,
      userId: userInstance.id,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.postForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const userInstance = await UserModel.findOne({ email });

    // If the user is not found, return an error response
    if (!userInstance) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }

    // In-memory storage for generated OTPs and their expiration times
    req.otpStorage = {};

    // Function to generate a random OTP
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000);
    }

    // Function to send OTP via email
    async function sendOTP(to) {
      const otp = generateOTP();

      // OTP expires in 5 minutes (adjust as needed)
      const expirationTime = Date.now() + 5 * 60 * 1000;

      // Store OTP and its expiration time in the database
      await UserModel.updateOne(
        { email: email },
        { $set: { otp: otp, expirationTime: expirationTime } }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: "OTP FOR YOUR PASSWORD UPDATE",
        text: `Your OTP for the above task is: ${otp}`,
      };

      // Send mail with defined transport object
      const info = await transporter.sendMail(mailOptions);

      console.log("Email sent:", info);

      return res.status(200).json({
        message: "OTP sent successfully via email",
        redirect: `/validateotp/${userInstance.id}`,
      });
    }

    // Step 1: Send OTP via email
    await sendOTP(userInstance.email);
  } catch (error) {
    console.error("Error in forgetPassword route:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error,
    });
  }
};

exports.postValidate = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).json({ errors: error.array() });
    }
    const { userEnteredOTP } = req.body;

    const foundUser = await UserModel.findById(userId);
    const { otp, expirationTime } = foundUser;

    console.log("storage", otp, expirationTime);
    // Function to validate OTP
    async function validateOTP(userEnteredOTP) {
      if (+otp === +userEnteredOTP && Date.now() < expirationTime) {
        // Valid OTP
        console.log("OTP is valid.");
        await UserModel.updateOne(
          { _id: userId },
          {
            $set: { isValid: true },
          }
        );
        return res.status(200).json({
          msg: "Verification successful",
          path: `/changepassword/${userId}`,

          // message: twilioRes,
        });
      } else {
        // Invalid or expired OTP
        console.log("Invalid or expired OTP.");
        return res.status(401).json({
          error: "Invalid or expired OTP",
        });
      }
    }

    // Step 3: Validate OTP
    validateOTP(userEnteredOTP);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.patchChangePassword = async (req, res, next) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }
  const user = await UserModel.findById(userId);
  if (user.isValid && user.expirationTime > Date.now()) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userInstance = await UserModel.updateMany(
      { _id: userId },
      { password: hashedPassword, isValid: false }
    );

    return res.status(201).json({
      message: "update successful",
      path: "/login",
    });
  } else {
    return res.status(401).json({
      error: "unAuthorized",
    });
  }
};
