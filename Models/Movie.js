const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema({
    id: {
        type: String,
        required: true,
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
       ref: "Category",
       type: mongoose.Schema.Types.ObjectId,
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
        ref: "Actor",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    }
}, { timestamps: true });
MovieSchema.plugin(autoIncrement, {
    model: "Movie",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});
MovieSchema.index({ id: 1 }, { unique: true });
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;