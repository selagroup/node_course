var router= require('express').Router();
var client = require('../Modules/stackApiClient');

router.get('/',function(req,res,next){

    var page=req.query.page || 1;

    client.getQuestions(page,20,function(err,data){
        if(err) return next(err);

        res.render('questions',{data:data,curPage:page});
    });


});

module.exports=router;
