const MovieService = require("../Services/MovieService.js");


const createMovie = async (req, res, next) => {
    try {
        const movieData = req.body;
        const movie = await MovieService.createMovie(movieData);
        res.status(201).json({ message: "Movie created successfully", movie });
    } catch (error) {
        next(error);
    }
}
const getMovies = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const movies = await MovieService.getMovies(page, limit);
        res.status(200).json({ message: "Movies fetched successfully", movies });
    } catch (error) {
        next(error);
    }
}
const getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await MovieService.getMovieById(id);
        res.status(200).json({ message: "Movie fetched successfully", movie });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createMovie,
}