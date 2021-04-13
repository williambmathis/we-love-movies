const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addMovie = mapProperties({
  movie_id: "movies.movie_id",
  title: "movies.title",
  runtime_in_minutes: "movies.runtime_in_minutes",
  rating: "movies.rating",
  description: "movies.description",
  image_url: "movies.image_url",
  is_showing: "movies.is_showing",
  theater_id: "movies.theater_id",
});

function extractMovieFromTheater(theater) {
    if(!theater.movie_id){
        return null;
    }
  const movie = {
    movie_id: theater.movie_id,
    title: theater.title,
    runtime_in_minutes: theater.runtime_in_minutes,
    rating: theater.rating,
    description: theater.description,
    image_url: theater.image_url,
    is_showing: theater.is_showing,
    theater_id: theater.theater_id,
  };
  delete theater.movie_id;
  delete theater.title;
  delete theater.runtime_in_minutes;
  delete theater.rating;
  delete theater.description;
  delete theater.image_url;
  delete theater.is_showing;
  return movie;
}

function list() {
  return (
    knex("theaters")
      .join(
        "movies_theaters",
        "theaters.theater_id",
        "movies_theaters.theater_id"
      )
      .join("movies", "movies.movie_id", "movies_theaters.movie_id")
      //.where({ "movies_theaters.theater_id": "theaters.theater_id"})
      .then((theatersWithMovies) => {
        const result = {};
        theatersWithMovies.forEach((theaterWithMovie) => {
          if (result[theaterWithMovie.theater_id]) {
            const movie = extractMovieFromTheater(theaterWithMovie);
            result[theaterWithMovie.theater_id].movies.push(movie);
          } else {
            const movie = extractMovieFromTheater(theaterWithMovie);
            theaterWithMovie.movies = [];
            if(movie){
            theaterWithMovie.movies.push(movie);
            }
            result[theaterWithMovie.theater_id] = theaterWithMovie;
          }
        });
        const theaters = [];
        Object.keys(result).forEach(key => {
            theaters.push(result[key]);
        })
        return theaters;
      })
  );
}

module.exports = {
  list,
};
