var router= require('express').Router();
var client = require('../Modules/stackApiClient');

router.post('/',function(req,res,next){

    var query=req.body.q;
    var page=1;

    client.searchQuestions(query,page,20,function(err,data){
        if(err) return next(err);

        res.render('questions',{data:data,curPage:page});
    });


});

module.exports=router;
