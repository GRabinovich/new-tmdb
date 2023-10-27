const Users = require("./Users");
const Movies = require("./Movies");

Movies.belongsToMany(Users, { through: "favorites", timestamps: false })
Users.belongsToMany(Movies, { through: "favorites", timestamps: false })

module.exports = { Users, Movies };