const Record = require('./Connect').Record;
const User = require('./Connect').User;
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path'); // include for heroku

// const title = 'Boku no Pico';
var mangaName, mangaJapName, mangaCreatedAt, mangaRating, mangaSynopsis, mangaID, limit;
var animeStartDate, animeEpisodes, animeScore, animeAiring, animeGenres;
var username, email, password;

// cookie parser
var cookieParser = require("cookie-parser");
app.use(cookieParser());

// Calling API
// add data
// http://localhost:5000/add?title=lupin
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
                    userId: req.cookies["uid"],
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

// show data from the API
// http://localhost:5000/show?title=pokemon
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
        mangaData.posterImg = response.data.data[0].attributes.posterImage.original;
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
                mangaData.animeStartDate = response.data.results[0].start_date;
                mangaData.animeEpisodes = response.data.results[0].episodes;
                mangaData.animeScore = response.data.results[0].score;
                mangaData.animeAiring = response.data.results[0].airing;
                res.send(mangaData);
            });
        });
    });
});

// delete single document
// http://localhost:5000/delete?id=
app.get('/delete',(req,res)=>{
    id = req.query.id;
    console.log(id);
    if (id != "undefined" && id != null && id != "") {
        Record.deleteOne({ _id: id }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
    
        res.send("<h1>Deleting one data</h1>");
    }
});

// update multiple field in document
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
// http://localhost:5000/getAllData
app.get('/getAllData', (req, res) => {
    Record.find({ userId: req.cookies["uid"] })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

// find document based on id or title
// http://localhost:5000/find?title=Pokemon%20Heroes // http://localhost:5000/find?id=5f09dd65862e5929000758a8
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
        Record.find({ mangaName: title, userId: req.cookies["uid"] })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
    }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// User account mongoose action
// http://localhost:5000/createUser?user=xiaoMing&email=123@gmail.com&pass=asd
app.get('/createUser', (req, res) => {
    username = req.query.user;
    email = req.query.email;
    password = req.query.pass;

    // hash password
    var passwordHash = require('password-hash');
    var hashedPassword = passwordHash.generate(password);

    userDetails = new User ({
        username: username,
        email: email,
        password: hashedPassword
    });
    // save to database
    userDetails
    .save()
    .then(result => {
        console.log("Success" + result);
        res.send("<h1>New user created!<h1>");
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

// get that particular user data
// http://localhost:5000/getUserData
app.get('/getUserData', (req, res) => {
    User.find({ _id: req.cookies["uid"] })  
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

// get all user data
// http://localhost:5000/getUserData
app.get('/checkSameData', (req, res) => {
    User.findOne({ username: req.query.user })  
      .then(response => {
        console.log(response);
        if (response) {
            return res.send(true);
        }
        else {
            return res.send(false);
        }
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

// http://localhost:5000/login?user=ShenLoong99&pass=P@$$vv0rD
app.post("/login", async (req, res) => {
    // check if email exist
	const user = await User.findOne({ username: req.body.user.username });
	if (!user) {
		return res.send(false);
	}

    // check if password correct
    var passwordHash = require('password-hash');
	const validPsw = passwordHash.verify(req.body.user.password, user.password);
	if (!validPsw) {
		return res.send(false);
	}

	// save token and user id to cookie
	res.cookie("uid", user._id); // to verify if user have login
	res.cookie("uname", user.username); // while be used while saving artist
	res.cookie("uemail", user.email); // will be display on navigation bar (logged in as UserName)
	res.send(true);
});

// logout code
// http://localhost:5000/logout
app.post('/logout', async (req, res) => {
    // clear auth-token cookie and user id cookie
	res
    .clearCookie("uname")
    .clearCookie("uid")
    .clearCookie("uemail")
    .send(true);
});

// check whether cookie exist
// http://localhost:5000/checkCookie
app.get('/checkCookie', (req, res) => {
    if (req.cookies["uid"] == null || req.cookies["uid"] == "" || req.cookies["uid"] == "undefined") {
        return res.send(false);
    }
    else {
        return res.send(true);
    }
});

// update user data
app.get('/updateUser', (req, res) => {
    var username = req.query.user;
    var email = req.query.email;
    Record.updateOne({ _id: req.cookies["uid"] }, { username: username }, function(err, res) {
        // Updated at most one doc, `res.modifiedCount` contains the number
        // of docs that MongoDB updated
    });
    Record.updateOne({ _id: req.cookies["uid"] }, { email: email }, function(err, res) {
        // Updated at most one doc, `res.modifiedCount` contains the number
        // of docs that MongoDB updated
    });
    res.send("<h1>Updating user data<h1>");
}); 

// Heroku
if (process.env.NODE_ENV === 'production') { 
    // Exprees will serve up production assets
    app.use(express.static( 'client/build' ));

    app.get('*', () => (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });