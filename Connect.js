const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = "mongodb+srv://ShenLoong99:123@webapiassignment-x0qmy.mongodb.net/MangaAPI?retryWrites=true&w=majority";
const path = require("path");

//Connect to MongoDB database
mongoose
	.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to database");
	})
	.catch(() => {
		console.log("Error can't connect to database");
	});

// manga schema
const mangaSchema = new mongoose.Schema({
    mangaName: {type: String},
    userId: {type: String},
    mangaJapName: {type: String},
    mangaCreatedAt: {type: Date}, 
    mangaRating: {type: Number},
    mangaSynopsis: {type: String},
    animeStartDate: {type: Date},
    animeEpisodes: {type: Number},
    animeScore: {type: Number},
    animeAiring: {type: Boolean},
    animeGenres: {type: String}, 
    posterImg: {type: String}
});

// user schema
const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

const Record = mongoose.model('manga', mangaSchema);
const User = mongoose.model('user', userSchema);

module.exports.Record = Record;
module.exports.User = User;