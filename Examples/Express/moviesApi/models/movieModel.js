class Movie {
    constructor(title='', year=0, poster='', releaseDate=null, genres= []){
        this.id =0;
        this.title = title;
        this.year=year;
        this.poster=poster;
        this.releaseDate = releaseDate;
        this.genres = genres;
    }
  }

  module.exports = Movie;
  