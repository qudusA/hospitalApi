const express = require("express");
const medicationHistoryController = require("../controller/medicationHistory");

const router = express.Router();

router.get(
  "/getbookedappointment",
  medicationHistoryController.getBookedAppointment
);

router.get("/personalinfo", medicationHistoryController.getPersonalInfo);

router.post("/addmedication", medicationHistoryController.postAddMedication);

module.exports = router;
