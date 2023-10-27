const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWJlY2ExMzMyNTMzMTJhNGIwNWE0MDBhMjY2MjZmMiIsInN1YiI6IjY0ZWNhYjA1ZTg5NGE2MDEzYmIxZDk3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.laTNh123kmU4P9oskiJsYblPskofIa7wZLpx_B5wEF0";

router.get("/:type", (req, res) => {
  const { type } = req.params;
  let urlMoviesOrSeries;
  if (type === "movies")
    urlMoviesOrSeries =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  if (type === "series")
    urlMoviesOrSeries =
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";

  const options = {
    method: "GET",
    url: urlMoviesOrSeries,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/:type/:id", (req, res) => {
  const { type, id } = req.params;
  let urlMoviesOrSeries;
  if (type === "movies")
    urlMoviesOrSeries = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  if (type === "series")
    urlMoviesOrSeries = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  const options = {
    method: "GET",
    url: urlMoviesOrSeries,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/:type/search/:name", (req, res) => {
  const { type, name } = req.params;
  let urlMoviesOrSeries;
  if (type === "movies")
    urlMoviesOrSeries = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
  if (type === "series")
    urlMoviesOrSeries = `https://api.themoviedb.org/3/search/tv?query=${name}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    url: urlMoviesOrSeries,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
