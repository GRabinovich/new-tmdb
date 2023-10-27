const Sequelize = require("sequelize");
const db = require("../config/db");

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, sequelize: db, modelName: "users" }
);

module.exports = Users;
