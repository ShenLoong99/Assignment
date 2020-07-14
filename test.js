const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');

// const title = 'Boku no Pico';
var mangaJapName, mangaCreatedAt, mangaRating, mangaSynopsis, mangaID, limit;
var animeStartDate, animeEpisodes, animeScore, animeAiring, animeGenres;

app.get('/add',(req,res)=>{
    title = req.query.title;
    const querystr = `https://kitsu.io/api/edge/manga?filter[text]=${title}`;

    axios.get(querystr).then(   (response) =>{
        mangaName = response.data.data[0].attributes.titles.en;
        mangaJapName = response.data.data[0].attributes.titles.ja_jp;
        mangaCreatedAt = response.data.data[0].attributes.createdAt;
        mangaRating = response.data.data[0].attributes.averageRating;
        mangaSynopsis = response.data.data[0].attributes.synopsis;
        mangaID = response.data.data[0].id;

        const querystr1 = `https://kitsu.io/api/edge/manga/${mangaID}/genres`;

        axios.get(querystr1).then(  (response) =>{
            limit = response.data.data.length;
            animeGenres = response.data.data[0].attributes.name;
            for (i = 1; i < limit; i++) {
                animeGenres += ", " + response.data.data[i].attributes.name;
            }

            const querystr2 = `https://api.jikan.moe/v3/search/anime?q=${title}`;

            axios.get(querystr2).then(  (response) =>{
                animeStartDate = response.data.results[0].start_date;
                animeEpisodes = response.data.results[0].episodes;
                animeScore = response.data.results[0].score;
                animeAiring = response.data.results[0].airing;

                // Save to database
                mangaDetails = new Record ({
                    mangaName: mangaName,
                    mangaJapName: mangaJapName,
                    mangaCreatedAt: mangaCreatedAt, 
                    mangaRating: mangaRating,
                    mangaSynopsis: mangaSynopsis,
                    animeStartDate: animeStartDate,
                    animeEpisodes: animeEpisodes,
                    animeScore: animeScore,
                    animeAiring: animeAiring,
                    animeGenres: animeGenres
                });
                
                mangaDetails
                .save()
                .then(result => {
                    console.log("Success" + result);
                })
                .catch(error => {
                    console.log("Error" + error);
                });
            });
        });
    });
    res.send("<h1>Adding data<h1>");
});

// be very careful of case sensitive names
// http://localhost:5000/delete?title=&deleteMultiple=yes||no
app.get('/delete',(req,res)=>{
    title = req.query.title;
    deleteMultiple = req.query.deleteMultiple;
    console.log(deleteMultiple);
    if (deleteMultiple == "no") {
        Record.deleteOne({ mangaName: title }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });

        res.send("<h1>Deleting one data</h1>");
    }
    else if (deleteMultiple == "yes") {
        Record.deleteMany({ mangaName: title }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
        res.send("<h1>Deleting multiple data</h1>");
    }
    else {
        res.send("<h1>Error! Must include the correct deleteMultiple value in URL! yes or no</h1> ");
    }
});

app.get('/update',(req,res)=>{
    title = req.query.title;
    attribute = req.query.att;
    edit = req.query.edit;
    if (attribute == "mangaName") {
        Record.updateOne({ mangaName: title }, { mangaName: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "mangaJapName") {
        Record.updateOne({ mangaName: title }, { mangaJapName: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "mangaCreatedAt") {
        Record.updateOne({ mangaName: title }, { mangaCreatedAt: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "mangaRating") {
        Record.updateOne({ mangaName: title }, { mangaRating: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "mangaSynopsis") {
        Record.updateOne({ mangaName: title }, { mangaSynopsis: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "animeStartDate") {
        Record.updateOne({ mangaName: title }, { animeStartDate: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "animeEpisodes") {
        Record.updateOne({ mangaName: title }, { animeEpisodes: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "animeScore") {
        Record.updateOne({ mangaName: title }, { animeScore: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "animeAiring") {
        Record.updateOne({ mangaName: title }, { animeAiring: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (attribute == "animeGenres") {
        Record.updateOne({ mangaName: title }, { animeGenres: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else {
        res.send("Error! Must include attribute or edit in URL to know what to edit!!! Attributes are mangaName, mangaJapName, mangaCreatedAt, mangaRating, mangaSynopsis, animeStartDate, animeEpisodes, animeScore, animeAiring and animeGenres");
    }
    
    res.send("<h1>Updating data<h1>");
});

// get all saved data
app.get('/getAllData', (req, res) => {
    Record.find({})  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

app.get('/show',(req,res)=>{
    title = req.query.title;
    const querystr = `https://kitsu.io/api/edge/manga?filter[text]=${title}`;

    axios.get(querystr).then(   (response) =>{
        mangaName = response.data.data[0].attributes.titles.en;
        mangaJapName = response.data.data[0].attributes.titles.ja_jp;
        mangaCreatedAt = response.data.data[0].attributes.createdAt;
        mangaRating = response.data.data[0].attributes.averageRating;
        mangaSynopsis = response.data.data[0].attributes.synopsis;
        mangaID = response.data.data[0].id;

        const querystr1 = `https://kitsu.io/api/edge/manga/${mangaID}/genres`;

        axios.get(querystr1).then(  (response) =>{
            limit = response.data.data.length;
            animeGenres = response.data.data[0].attributes.name;
            for (i = 1; i < limit; i++) {
                animeGenres += ", " + response.data.data[i].attributes.name;
            }

            const querystr2 = `https://api.jikan.moe/v3/search/anime?q=${title}`;

            axios.get(querystr2).then(  (response) =>{
                animeStartDate = response.data.results[0].start_date;
                animeEpisodes = response.data.results[0].episodes;
                animeScore = response.data.results[0].score;
                animeAiring = response.data.results[0].airing;
                res.send("<h1>Showing data</h1><br>Manga Title: " + mangaName + "<br>Manga Japanese Name: " + mangaJapName + "<br>Created At: " + mangaCreatedAt + "<br>Average Rating: " + mangaRating + "/100<br>Synopsis: " + mangaSynopsis + "<br>Anime<br>Genres: " + animeGenres + "<br>Start Date: " + animeStartDate + "<br>Episodes: " + animeEpisodes + "<br>Score: " + animeScore + "/10<br>Airing: " + animeAiring);
            });
        });
    });
    // res.send("<h1>Showing data</h1><br>Manga Title: " + title + "<br>Manga Japanese Name: " + mangaJapName + "<br>Created At: " + mangaCreatedAt + "<br>Average Rating: " + mangaRating + "/100<br>Synopsis: " + mangaSynopsis + "<br>Anime<br>Start Date: " + animeStartDate + "<br>Episodes: " + animeEpisodes + "<br>Score: " + animeScore + "/10<br>Airing: " + animeAiring);
});

app.listen(5000, () => {
    console.log('server listening on port 5000');
  });
