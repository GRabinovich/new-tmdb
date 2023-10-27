const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

router.post("/register", (req, res) => {
  const { username, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);

  Users.findOne({ where: { [Op.or]: [{ username }, { email }] }})
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "El nombre de usuario o correo electrónico ya está en uso." });
      }

      Users.create({
        username: username,
        email: email,
        password: password,
      })
        .then(() => {
          res.status(201).json("Usuario creado exitosamente");
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const SECRET = "KIWI";

  Users.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
        expiresIn: "20d",
      });
      res.cookie("token", token);
      res.status(200).json({ id: user.id, username: user.username });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/logout", (req, res) => {
  const token = req.cookies.token;
  res.clearCookie(token);
  res.send("Logout exitoso");
});

module.exports = router;
