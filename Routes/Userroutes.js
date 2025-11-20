const express = require("express");
const router = express.Router();
const { createUser, login } = require("../Controller/User.js");
const validate = require("../MiddleWares/Validate.js");
const { signUpSchema } = require("../Validation/Index.js");

// Public routes - no authentication required
router.post("/signup", validate(signUpSchema), createUser);
router.post("/login", login);

module.exports = router;
