const db = require('../mocks/movies.json');

const movies = db.movies;

const byId = (id) => (movie) => movie.id === id; 

function get(page=1, pageSize=10){
    
    let index = (page-1)*pageSize;
    return Promise.resolve(movies.slice(index,index+pageSize));
}   

function getOne(id){
    let movie = movies.find(byId(id));
    return movie ? Promise.resolve(movie) : Promise.reject();
}

function create(movie){
    movie.id = Math.ceil(Math.random() * 100);
    movies.push(movie);

    return Promise.resolve(movie);
}

function update(id,movie){

    let inx  = movies.findIndex(byId(id));
    console.log(inx);
    if(inx > -1){
        
        movies[inx] = Object.assign({},movies[inx],movie);
        return Promise.resolve(movies[inx]);
    }

    return;
}


function remove(id){
    let inx  = movies.findIndex(byId(id));
    if(inx > -1){
        movies.splice(inx,1);
        return  Promise.resolve(true);
    }

    return Promise.resolve(false);

}   

module.exports ={ get, getOne, create, update, remove }



