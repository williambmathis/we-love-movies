//const { as } = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list(req, res, next) {
    //console.log(req.query.is_showing);
  if (req.query.is_showing) {
    const data = await service.certainList();
    //console.log(data);
    res.json({
      data,
    });
  } else {
    const data = await service.list();
    res.json({
      data,
    });
  }
}


async function movieExists(req, res, next){
    const movie = await service.read(req.params.movie_id);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({status: 404, message: `Movie cannt be found`})
}

async function read(req, res, next){
    const data = res.locals.movie;
    res.json({
        data,
    });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
