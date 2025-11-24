const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Movie",
    default: [],
  },
  watchlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Movie",
    default: [],
  },
  favcategories: {
    type: [String],
    default: [],
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  gender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// bcrypt password
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create unique index on email
Schema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", Schema);
module.exports = User;
