if (process.env.USER) require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router")
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(express.json());

app.use(cors());
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
