const router = require('express').Router();
const createError = require('http-errors');
const service = require('../services/movieServiceDB');
const paging = require('../middlewares/pagingMiddleware');
const movieModel = require('../models/movieModel');
const { check, validationResult } = require('express-validator/check');

router.use(paging());
router.get('/:id', async (req,res,next) => {    
    
    try { 
        res.send(await service.getOne(req.params['id']));
    } catch (error) {
        next(createError(404));
    }
});

router.put('/:id', async (req,res,next) => {
    try {
        res.send(await service.update(req.params.id,req.body)); 
    } catch (error) {
        next(createError(422));
    }
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
        .isLength(2),
    check('year', 'year is required').exists(),
    check('poster','poster must be a valid url string').isURL()
],async (req,res,next) => {
    
    const errors = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors })=> msg );
    
    if(!errors.isEmpty())
      return next(createError(422,{ message:errors.array({ onlyFirstError:true }).join()}));

    let movie = new movieModel(req.body.title, 
        req.body.year, 
        req.body.poster
    );

    res.send(await service.create(movie));
});




module.exports = router;

