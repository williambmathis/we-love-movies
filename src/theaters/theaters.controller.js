const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res, next){
    const data = await service.list();
    //console.log(data);
    res.json({
        data,
    });
}


module.exports ={
    list,
}