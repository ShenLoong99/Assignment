const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path'); // include for heroku

// const title = 'Boku no Pico';
var mangaName, mangaJapName, mangaCreatedAt, mangaRating, mangaSynopsis, mangaID, limit;
var animeStartDate, animeEpisodes, animeScore, animeAiring, animeGenres;
const PORT = process.env.PORT || 8080; // step 1: heroku

// step 2: heroku
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/mangaAPI', {
    useNewURLParser: true
}) 

app.get('/add',(req,res)=>{
    title = req.query.title;
    const querystr = `https://kitsu.io/api/edge/manga?filter[text]=${title}`;

    axios.get(querystr).then(   (response) =>{
        if (response.data.data[0].attributes.titles.en != null) 
            mangaName = response.data.data[0].attributes.titles.en;
        else 
            mangaName = response.data.data[0].attributes.titles.en_jp;
        mangaJapName = response.data.data[0].attributes.titles.ja_jp;
        mangaCreatedAt = response.data.data[0].attributes.createdAt;
        mangaRating = response.data.data[0].attributes.averageRating;
        mangaSynopsis = response.data.data[0].attributes.synopsis;
        mangaID = response.data.data[0].id;
        posterImg = response.data.data[0].attributes.posterImage.original;

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
                    animeGenres: animeGenres, 
                    posterImg: posterImg
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

// http://localhost:5000/delete?id=
app.get('/delete',(req,res)=>{
    id = req.query.id;
    console.log(id);
    if (id == "undefined" || id == null || id == "") {
        res.send("<h1>Error! ID must not be empty!</h1>");
    }
    else {
        Record.deleteOne({ _id: id }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
    
        res.send("<h1>Deleting one data</h1>");
    }
});

// http://localhost:5000/update?id=&att=&edit=
app.get('/update', (req,res) => {
    var id = req.query.id;
    var att = req.query.att;
    var edit = req.query.edit;

    if (att == "mangaName" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { mangaName: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "alter" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { mangaJapName: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "created" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { mangaCreatedAt: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "rating" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { mangaRating: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "synopsis" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { mangaSynopsis: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "start" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { animeStartDate: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "episodes" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { animeEpisodes: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "score" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { animeScore: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "airing" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { animeAiring: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "genres" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { animeGenres: edit }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
    }
    else if (att == "poster" && edit != "" && edit != null && edit != "undefined") {
        Record.updateOne({ _id: id }, { posterImg: edit }, function(err, res) {
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
    Record.find({ })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

app.get('/find', (req, res) => {
    id = req.query.id;
    title = req.query.title;
    if (id != "undefined" && id != "" && id != null) {
        Record.find({ _id: id })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
    }
    else if (title != "undefined" || title != "" || title != null) {
        Record.find({ mangaName: title })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
    }
});

app.get('/show',(req,res)=>{
    title = req.query.title;
    var mangaData = {
        mangaName: '',
        mangaJapName: '',
        mangaCreatedAt: '',
        mangaRating: '',
        mangaSynopsis: '',
        posterImg: '',
        animeGenres: '',
        animeStartDate: '',
        animeEpisodes: '',
        animeScore: '',
        animeAiring: ''
    }
    const querystr = `https://kitsu.io/api/edge/manga?filter[text]=${title}`;
    axios.get(querystr).then(   (response) =>{
        if (response.data.data[0].attributes.titles.en != null) 
            mangaData.mangaName = response.data.data[0].attributes.titles.en;
        else 
            mangaData.mangaName = response.data.data[0].attributes.titles.en_jp;
        mangaData.mangaJapName = response.data.data[0].attributes.titles.ja_jp;
        mangaData.mangaCreatedAt = response.data.data[0].attributes.createdAt;
        mangaData.mangaRating = response.data.data[0].attributes.averageRating;
        mangaData.mangaSynopsis = response.data.data[0].attributes.synopsis;
        mangaID = response.data.data[0].id;
        
        const querystr1 = `https://kitsu.io/api/edge/manga/${mangaID}/genres`;

        axios.get(querystr1).then(  (response) =>{
            limit = response.data.data.length;
            animeGenres = response.data.data[0].attributes.name;
            for (i = 1; i < limit; i++) {
                animeGenres += ", " + response.data.data[i].attributes.name;
            }
            mangaData.animeGenres = animeGenres;

            const querystr2 = `https://api.jikan.moe/v3/search/anime?q=${title}`;

            axios.get(querystr2).then(  (response) =>{
                mangaData.posterImg = response.data.results[0].image_url;
                mangaData.animeStartDate = response.data.results[0].start_date;
                mangaData.animeEpisodes = response.data.results[0].episodes;
                mangaData.animeScore = response.data.results[0].score;
                mangaData.animeAiring = response.data.results[0].airing;
                res.send(mangaData);
            });
        });
    });
});

// step 3: heroku
if (process.env.NODE_ENV === 'production') { 
    app.use(express.static( 'client/build' ));

    app.get('*', () => (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    })
}

app.listen(5000, () => {
    console.log('server listening on port 5000');
  });

//   app.listen(process.env.PORT || 8080, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });