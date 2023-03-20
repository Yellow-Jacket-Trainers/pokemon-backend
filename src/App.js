'use strict'

const axios = require('axios');
let cache = require('./cache.js');


async function getMovies (request, response, next) {
  console.log('in the getMovies function')
  console.log(request.query.keyword)
  try {
    //let willsmith = request.query.willsmith;
    let keyword = request.query.keyword
    let key = keyword + 'Data';
    // const key 
    // let params ={
    //   key: process.env.MOVIE_API_KEY,
    //   query: willsmith;
     //language: en-US,
    //page: 1,
    //include_adult: false

    // };
    console.log('hi');
    //console.log(`https;//api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`);
   
    //response.send(sortmovies);
    if (cache[key] && (Date.now() - cache[key].timestamp < 864000000)) {
      console.log('movie Cache hit');
    } else {
      console.log('movie Cache miss');
      let moviesApi = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
      );
  
  //console.log(moviesApi.data.results);
      
      let sortmovies = moviesApi.data.results.map(i => {
        console.log(i, 'mapping results')
        const movie= new Movies(i);
       
      return movie
      });
     console.log(cache[key])
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = sortmovies;
      console.log(sortmovies)
      response.send(sortmovies);
    }

  console.log(cache[key].data, 'this is the cache[key].data'); 
    response.send(cache[key].data);


  }
catch(err){
Promise.resolve().then(() => {
 Error(err.message);
}).catch(next);
}
}
// clsss for movies
class Movies {
  constructor(movieFromSearch) {
    this.title = movieFromSearch.original_title;
    this.overview = movieFromSearch.overview;
    this.average_votes = movieFromSearch.vote_average;
    this.total_votes = movieFromSearch.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movieFromSearch.poster_path}`;
    this.popularity = movieFromSearch.popularity;
    this.released_on = movieFromSearch.release_date;
  }
}

module.exports = getMovies