const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

router 
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);
router  
    .route("/:movie_id")
    .get(controller.read)
    .all(methodNotAllowed);

router.use("/:movie_id/theaters", theatersRouter)

router.use("/:movie_id/reviews", reviewsRouter)
    

module.exports = router;