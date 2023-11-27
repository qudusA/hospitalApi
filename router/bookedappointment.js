const express = require("express");
const bookappointmentController = require("../controller/bookedappointment");
const isAuth = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/bookappointment",
  isAuth,
  [
    body("patientId").isMongoId().withMessage("unAuthorized"),
    body("appointmentType").isString().withMessage("wrong appointment Input"),
    body("appointmentDate")
      .isDate()
      .withMessage("this is not a valit date")
      .custom((value, { req }) => {
        if (new Date(value) < Date.now()) {
          throw new Error("date cannot be in the past");
        }
        return true;
      }),
    body("reasonOfAppointment").isString().optional(),
    body("HMO").custom((value) => {
      const hmoArr = ["yes", "no"];
      if (!value) {
        throw new Error("invalid entry");
      }
      if (!hmoArr.some((val) => val === value.toLowerCase())) {
        throw new Error("invalid entry");
      }

      return true;
    }),
    body("paymentStatus").isBoolean(),
    body("ceargiver").isEmail().optional(),
  ],
  bookappointmentController.postBookedAppointment
);

router.post("/bookappointment/payment", bookappointmentController.postPyment);

module.exports = router;
