const knex = require("../db/connection");

async function update(review) {
  //console.log(review.review_id);
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic)
    //.first();
    //.then((createdRecords) => createdRecords[0]);
}

async function setCritic(review){
  review.critic = await readCritic(review.critic_id)
  return review;
}

async function readCritic(critic_id){
  return knex("critics")
    .where({ critic_id })
    .first();
}

async function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

async function destroy(reviewId) {
  //console.log(reviewId);
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function list(movie_id){
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)))
}

module.exports = {
  update,
  read,
  destroy,
  list
};
