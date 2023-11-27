const express = require("express");
const { body } = require("express-validator");

const staffIdInstanceController = require("../controller/staffIdCreation");

const router = express.Router();

router.post(
  "/inputid",
  [
    body("staffId").isAlphanumeric().withMessage("invalid entry"),
    body("fullName")
      .isString()
      .withMessage("invalid entry")
      .custom((value) => {
        if (value.split(" ").length === 1) {
          throw new Error("this is not a valid name");
        }
        return true;
      }),
    body("position").custom((value) => {
      function validatePos(val) {
        const posArr = ["hr", "doctor", "nurse"];
        return posArr.some((pos) => val.toLowerCase() === pos.toLowerCase());
      }
      if (!value) {
        throw new Error("kindly input a valid position");
      }

      if (!validatePos(value)) {
        throw new Error("kindly input a valid position");
      }
      return true;
    }),
  ],
  staffIdInstanceController.postCreateStaffId
);

module.exports = router;
