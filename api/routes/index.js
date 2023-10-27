const express = require("express");
const router = express.Router();

const movieAndSeriesRouter = require("./moviesAndSeries");
const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/", movieAndSeriesRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
