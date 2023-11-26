const { body } = require("express-validator");

const isValid = require("../middleware/passwordAuth");

// const bodyParser = require("body-parser");

const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("fullName")
      .isString()
      .custom((value) => value.split(" ").length > 1)
      .withMessage("Name must contain at least one space.")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 characters long."),
    body("email")
      .isEmail()
      .withMessage("this is not a valid email.")
      .normalizeEmail()
      .trim(),

    body("gender")
      .trim()
      .isAlpha()
      .isLength({ min: 1 })
      .withMessage("Kindly input at least one character.")
      .custom((value, { req }) => {
        // Capitalize the first character of the gender
        const capitalizedGender = value.slice(0, 1).toUpperCase();

        // Return the capitalized first character
        req.body.newGender = capitalizedGender;
        return true;
      }),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .custom((value) => {
        // Custom validation function for Node.js
        function validatePassword(password) {
          if (!password) {
            throw new Error("Password is required.");
          }

          if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
          }

          // Regular expressions for uppercase, lowercase, and numbers
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;
          const numberRegex = /\d/;

          // Check if the password satisfies all three conditions
          const hasUppercase = uppercaseRegex.test(password);
          const hasLowercase = lowercaseRegex.test(password);
          const hasNumber = numberRegex.test(password);

          if (!(hasUppercase && hasLowercase && hasNumber)) {
            throw new Error(
              "Password must contain at least one uppercase letter, one lowercase letter, and one number."
            );
          }

          // Password meets all criteria
          return true;
        }

        // Call and return the result of validatePassword
        return validatePassword(value);
      }),

    body("phone").custom((value, { req }) => {
      if (value.slice(0, 1) !== "+") {
        const result = value.slice(1);
        req.body.newPhone = `+234${result}`;
        // console.log(req.body.newPhone);
      }

      return true; // Validation passes
    }),
    body("country").custom((value) => {
      function isValidCountry(country) {
        const validCountries = [
          "Afghanistan",
          "Albania",
          "Algeria",
          "Andorra",
          "Angola",
          "Antigua and Barbuda",
          "Argentina",
          "Armenia",
          "Australia",
          "Austria",
          "Azerbaijan",
          "Bahamas",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Belarus",
          "Belgium",
          "Belize",
          "Benin",
          "Bhutan",
          "Bolivia",
          "Bosnia and Herzegovina",
          "Botswana",
          "Brazil",
          "Brunei",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Cabo Verde",
          "Cambodia",
          "Cameroon",
          "Canada",
          "Central African Republic",
          "Chad",
          "Chile",
          "China",
          "Colombia",
          "Comoros",
          "Congo",
          "Costa Rica",
          "Croatia",
          "Cuba",
          "Cyprus",
          "Czechia",
          "Denmark",
          "Djibouti",
          "Dominica",
          "Dominican Republic",
          "East Timor (Timor-Leste)",
          "Ecuador",
          "Egypt",
          "El Salvador",
          "Equatorial Guinea",
          "Eritrea",
          "Estonia",
          "Eswatini",
          "Ethiopia",
          "Fiji",
          "Finland",
          "France",
          "Gabon",
          "Gambia",
          "Georgia",
          "Germany",
          "Ghana",
          "Greece",
          "Grenada",
          "Guatemala",
          "Guinea",
          "Guinea-Bissau",
          "Guyana",
          "Haiti",
          "Honduras",
          "Hungary",
          "Iceland",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Ireland",
          "Israel",
          "Italy",
          "Ivory Coast",
          "Jamaica",
          "Japan",
          "Jordan",
          "Kazakhstan",
          "Kenya",
          "Kiribati",
          "Korea, North",
          "Korea, South",
          "Kosovo",
          "Kuwait",
          "Kyrgyzstan",
          "Laos",
          "Latvia",
          "Lebanon",
          "Lesotho",
          "Liberia",
          "Libya",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Madagascar",
          "Malawi",
          "Malaysia",
          "Maldives",
          "Mali",
          "Malta",
          "Marshall Islands",
          "Mauritania",
          "Mauritius",
          "Mexico",
          "Micronesia",
          "Moldova",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Morocco",
          "Mozambique",
          "Myanmar (Burma)",
          "Namibia",
          "Nauru",
          "Nepal",
          "Netherlands",
          "New Zealand",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "North Macedonia",
          "Norway",
          "Oman",
          "Pakistan",
          "Palau",
          "Panama",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines",
          "Poland",
          "Portugal",
          "Qatar",
          "Romania",
          "Russia",
          "Rwanda",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Vincent and the Grenadines",
          "Samoa",
          "San Marino",
          "Sao Tome and Principe",
          "Saudi Arabia",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Slovakia",
          "Slovenia",
          "Solomon Islands",
          "Somalia",
          "South Africa",
          "South Sudan",
          "Spain",
          "Sri Lanka",
          "Sudan",
          "Suriname",
          "Sweden",
          "Switzerland",
          "Syria",
          "Taiwan",
          "Tajikistan",
          "Tanzania",
          "Thailand",
          "Togo",
          "Tonga",
          "Trinidad and Tobago",
          "Tunisia",
          "Turkey",
          "Turkmenistan",
          "Tuvalu",
          "Uganda",
          "Ukraine",
          "United Arab Emirates",
          "United Kingdom",
          "United States",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Vatican City",
          "Venezuela",
          "Vietnam",
          "Yemen",
          "Zambia",
          "Zimbabwe",
        ];

        const normalizedCountry = country.toLowerCase();

        // Check if the normalized country is in the list of valid countries
        return validCountries.some(
          (validCountry) => validCountry.toLowerCase() === normalizedCountry
        );
      }

      // Function to validate the provided country
      function validateCountry(country) {
        if (!country) {
          throw new Error("Country is required.");
        }

        if (!isValidCountry(country)) {
          throw new Error("Invalid country name.");
        }

        // Country is valid
        return true;
      }

      // Call and return the result of validateCountry
      return validateCountry(value);
    }),
    body("flag").custom((value) => {
      function validate(val) {
        const arr = ["patient", "practitioner", "verifier/caregiver"];
        return arr.some((item) => item.toLowerCase() === val.toLowerCase());
      }

      function validateInput(val) {
        if (!val) {
          throw new Error("Identification field is required.");
        }

        if (!validate(val)) {
          throw new Error("Identification field is required.");
        }

        // If the input is valid
        return true;
      }

      // Return the result of validateInput
      return validateInput(value);
    }),
  ],
  userController.postSignup
);

router.post("/login", userController.postLogin);

router.post("/forgetPassword", userController.postForgetPassword);

router.post("/validateotp/:userId", userController.postValidate);

router.post(
  "/changepassword/:userId",
  [
    body("newPassword")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .custom((value, { req }) => {
        // Custom validation function for Node.js
        req.newPassword = value;
        function validatePassword(password) {
          if (!password) {
            throw new Error("Password is required.");
          }

          if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
          }

          // Regular expressions for uppercase, lowercase, and numbers
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;
          const numberRegex = /\d/;

          // Check if the password satisfies all three conditions
          const hasUppercase = uppercaseRegex.test(password);
          const hasLowercase = lowercaseRegex.test(password);
          const hasNumber = numberRegex.test(password);

          if (!(hasUppercase && hasLowercase && hasNumber)) {
            throw new Error(
              "Password must contain at least one uppercase letter, one lowercase letter, and one number."
            );
          }

          // Password meets all criteria
          return true;
        }

        // Call and return the result of validatePassword
        validatePassword(value);
        return true;
      }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.newPassword) {
          throw new Error("Password not match.");
        }
        return true;
      }),
  ],
  userController.postChangePassword
);

module.exports = router;
