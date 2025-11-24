const express = require("express");
const router = express.Router();
const { getobjectid } = require("../Controller/actors");
router.get("/getobjectid", getobjectid);
module.exports = router;
