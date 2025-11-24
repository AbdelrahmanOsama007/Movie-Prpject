const express = require("express");
const { auth } = require("../MiddleWares/Auth.js");
const validate = require("../MiddleWares/Validate.js");
const { addMovieSchema } = require("../Validation/Index.js");
const {
  createMovie,
  getMovies,
  getMovieById,
} = require("../Controller/MovieCintroller.js");
const router = express.Router();
router.post("/create", auth, validate(addMovieSchema), createMovie);
router.get("/get", auth, getMovies);
router.get("/get/:id", auth, getMovieById);

module.exports = router;
