const Category = require("../Models/Category");
const Actors = require("../Models/Actors");
const ApiError = require("../utils/ApiError");

const getobjectid = async (req, res) => {
  try {
    const actors = await Actors.find({}).select("_id name");
    const categories = await Category.find({}).select("_id name");

    res.status(200).json({
      actors,
      category: categories,
    });
  } catch (error) {
    throw new ApiError(500, "Error fetching actor and category IDs");
  }
};

module.exports = {
  getobjectid,
};
