const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function update(req, res){
    //console.log(req);
    //const data = res.locals.review;
    
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        //review_id = res.locals.review.review_id
    }
    const result = await service.update(updatedReview);
    console.log(result)
    res.json({
        data: result
    });
    //console.log("wow")
}

async function reviewExists(req, res, next){
    //console.log(req.params.reviewId)
    const review = await service.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: `review cannot be found`})
}

async function destroy(req, res){
    const data = res.locals.review;
    //console.log(data.review_id)
    await service.destroy(data.review_id)
    res.status(204).send();
    
}

async function list(req, res){
    //console.log("in the service")
    const data = await service.list(req.params.movie_id);
    res.json({
        data
    });
}


function noMovieIdInPath(req, res, next){
    if(req.params.movieId){
        return methodNotAllowed(req, res, next);
    }
    next();
}

function hasMovieIdInPath(req, res, next){
    //console.log(req.params)
    if(req.params.movie_id){
        return next();
    }
    return methodNotAllowed(req, res, next);
}



module.exports = {
    update: [noMovieIdInPath, asyncErrorBoundary(reviewExists),  asyncErrorBoundary(update)],
    destroy: [noMovieIdInPath, asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    list: [hasMovieIdInPath, asyncErrorBoundary(list)]
}