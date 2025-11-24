const Movie = require("../Models/Movie");
const ApiError = require("../utils/ApiError.js");

const createMovie = async (movieData) => {
    const existingMovie = await Movie.findOne({ name: movieData.name });
    if (existingMovie) {
        throw new ApiError("Movie already exists", 409);
    }
    const movie = await Movie.create(movieData);
    return movie;
}
// get all movies paginated
const getMovies = async (page, limit) => {
    const movies = await Movie.find()
    .populate("category","name")
    .populate("actors","name")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ rating: -1 })
    .exec();
    return movies;
}
const getALLMovies = async () => {
    const movies = await Movie.find();
    return movies;
}
const getMovieById = async (id) => {
    const movie = await Movie.findById(id);
    return movie;
}
const updateMovie = async (id, movieData) => {
    const movie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
    return movie;
}
const deleteMovie = async (id) => {
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
}
module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    getALLMovies,
}

