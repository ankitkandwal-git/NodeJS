const express = require('express');
const app = express();
const path = require('path')
const dbPath = path.join(__dirname, 'moviesData.db')
const sqlite3 = require('sqlite3');
const {open} = require('sqlite')
app.use(express.json())
let db = null

const inittializeDbAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("Server Running at http://localhost:3000/")
        })
    } catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}
inittializeDbAndServer();

const convertMovieDbToObject = (obj) => {
    return{
        movieId : obj.movie_id,
        directorId : obj.director_id,
        movieName : obj.movie_name,
        leadActor : obj.lead_actor
    }
}
// API 1 Return liost of all movies in the database
app.get('/movies/',async(request,response) => {
    const getMoviesQuery = `SELECT * FROM movies;`;
    const moviesArray = await db.all(getMoviesQuery);
    response.send(moviesArray.map((eachMovie)=> 
     convertMovieDbToObject(eachMovie)))
})

// POST API 2 Create a movie in the movie table
app.post(' /movies/',async(request,response) =>{
    const movieDetails = request.body;
    const {directorId,movieName,leadActor} = movieDetails;
    const addMovieQuery = `
    INSERT INTO 
    movies (director_id,movie_name,lead_actor)
    VALUES (${directorId},'${movieName}','${leadActor}');`;
    const dbResponse = await db.run(addMovieQuery);
    response.send("Movie Successfully Added")
})