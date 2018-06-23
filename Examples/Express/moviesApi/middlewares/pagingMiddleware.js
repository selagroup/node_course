const OPTIONS_DEFAULT = {
    pageParamName:'page',
    pageSizeParamName:'pagesize',
    pageDefault:1,
    pageSizeDefault:10
}
function pagingMiddleware(options){

    const opt = Object.assign({}, OPTIONS_DEFAULT,options);

    return (req,res,next) =>{
        let page = req.query[opt.pageParamName] || opt.pageDefault;  
        let pageSize = req.query[opt.pageSizeParamName] || opt.pages;  
        if(req.query[opt.pageParamName]){
            req.page = parseInt(page);
            req.pageSize = parseInt(pageSize);
        }

        next();
    }
}

module.exports = pagingMiddleware;