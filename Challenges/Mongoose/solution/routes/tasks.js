const router = require('express').Router();
const createError = require('http-errors');
const service = require('../services/taskService');
const { check, validationResult } = require('express-validator/check');

router.get('/:id', async (req,res,next) => {    
    
    try { 
        res.send(await service.getOne(req.params['id']));
    } catch (error) {
        next(createError(404));
    }
});

router.put('/:id', async (req,res,next) => {
    
    res.send(await service.update(req.params.id,req.body));
});

router.delete('/:id', async (req,res,next) => {
    
    
    res.send(await service.remove(req.params.id));
});
router.get('/', async (req,res,next) => {
    
    res.send(await service.get(req.page,req.pageSize));
});

router.post('/',[ 
    check('title','title must be at least 2 letters')
        .exists()
        .isLength(2)
],async (req,res,next) => {
    
    const errors = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors })=> msg );
    
    if(!errors.isEmpty())
      return next(createError(422,{ message:errors.array({ onlyFirstError:true }).join()}));


    res.send(await service.create(req.body));
});




module.exports = router;

