const bookedApointmentModel = require("../models/bookedApointment");
const patientModel = require("../models/patient");

exports.postBookedAppointment = async (req, res, next) => {
  try {
    const {
      appointmentType,
      appointmentDate,
      reasonOfAppointment,
      HMO,
      HmoName,
      caregiver,
    } = req.body;

    const bookedInstance = new bookedApointmentModel({
      patientId: req.userId,
      appointmentType,
      appointmentDate,
      reasonOfAppointment,
      HMO,
      HmoName,
      caregiver,
    });

    // patientModel.bookedappointment.push(bookedInstance);
    console.log(req.userId);

    const patientInstance = new patientModel({
      patientId: req.userId,
      bookedappointment: bookedInstance,
    });

    const booked = await Promise.all([
      bookedInstance.save(),
      patientInstance.save(),
    ]);

    res.status(201).json({
      redirect: `/payment`,
      //   message: `appointment booked for ${bookedInstance.appointmentDate}`,
      //   response: booked,
    });
  } catch (err) {
    next(err);
  }
};

exports.postPyment = async (req, res, next) => {};
