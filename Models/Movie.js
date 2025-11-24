const { array, required } = require("joi");
const mongoose = require("mongoose");

// Clear existing model if it exists to avoid cache issues
if (mongoose.models.Movie) {
  delete mongoose.models.Movie;
}

const MovieSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    actors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Actors",
    required:true 
    },
    realeseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Manual auto-increment for id field
MovieSchema.pre("save", async function (next) {
  if (this.isNew && !this.id) {
    try {
      const lastMovie = await this.constructor
        .findOne({}, { id: 1 })
        .sort({ id: -1 })
        .lean();
      this.id = lastMovie && lastMovie.id ? lastMovie.id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Create index on id field
MovieSchema.index({ id: 1 }, { unique: true });

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
