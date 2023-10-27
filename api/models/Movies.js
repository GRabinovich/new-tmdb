const Sequelize = require("sequelize");
const db = require("../config/db");

class Movies extends Sequelize.Model {}

Movies.init(
  {
    tmdbId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: Sequelize.DataTypes.STRING,
    },
    genres: {
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
    },
    rating: {
      type: Sequelize.DataTypes.FLOAT,
    },
  },
  { timestamps: false, sequelize: db, modelName: "movies" }
);

module.exports = Movies;
