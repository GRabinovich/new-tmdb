const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Movies = require("../models/Movies");

router.get("/:username/favorites", (req, res) => {
  const { username } = req.params;

  Users.findOne({
    where: { username: username },
    include: [{ model: Movies }],
  })
    .then((user) => res.send(user.movies))
    .catch(function (error) {
      console.error(error);
    });
});

router.post("/:userId/add-favorite", (req, res) => {
  const { tmdbId, title, releaseDate, imageURL, genres, description, rating } =
    req.body;
  const { userId } = req.params;

  Users.findByPk(userId).then((user) => {
    Movies.findOrCreate({
      where: {
        tmdbId: tmdbId,
        title: title,
        releaseDate: releaseDate,
        imageURL: imageURL,
        genres: genres,
        description: description,
        rating: rating,
      },
    })
      .then(([newfavorite]) => {
        newfavorite.addUser(user.id);
      })
      .then(() =>
        res
          .status(201)
          .send("Se ha agregado con éxito a tu lista de favoritos.")
      )
      .catch((error) => res.status(500).json(error));
  });
});

router.delete("/:userId/remove-favorite/:tmdbId", (req, res) => {
  const { userId, tmdbId } = req.params
  Movies.destroy({
      where: {
          tmdbId: tmdbId,
      },
      include: [{ model: Users, attributes: { id: userId } }]
  })
      .then(() => res.status(200).json("Se ha eliminado con éxito"))
      .catch((error) => res.status(500).json(error))
});

module.exports = router;
