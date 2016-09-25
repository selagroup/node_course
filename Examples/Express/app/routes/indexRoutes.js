var router=require('Express').Router();


router.get('/',function(req,res,next){
  //res.send('Hello Express Router');
  res.render('index');
})
router.get('/home',function(req,res,next){
    res.prop1='Home2';
    //res.send('Hello Express Router Home');
    next();
});
router.get('/home',function(req,res,next){
  res.send('Hello Express Router '+ res.prop1);
});

router.get('/page1/:name/:id?',function(req,res,next){
  
  var name=req.params.name,
        id=req.params.id,
        prodid = req.query.prodid;


  res.send(`Hello Express Params: 
                name-${name}, id-${id},
                Query: productId-${prodid}`);
});

router.get('/products/:name/:id?',function(req,res,next){
  
  var product={
        title:req.params.name,
        id:req.params.id,
        prodid:req.query.prodid
  };
  res.send(product);
});


module.exports=router;
