const express = require("express");
const { createUser, login } = require("../Controller/User.js");
const validate = require("../MiddleWares/Validate.js");
const { signUpSchema } = require("../Validation/Index.js");
const { auth } = require("../MiddleWares/Auth.js");

const router = express.Router();

router.post("/signup", validate(signUpSchema),createUser);
router.post("/login", login);

module.exports = router;
