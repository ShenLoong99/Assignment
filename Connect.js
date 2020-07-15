const mongoose = require('mongoose');
const { Double } = require('bson');

const db = "mongodb+srv://ShenLoong99:123@webapiassignment-x0qmy.mongodb.net/MangaAPI?retryWrites=true&w=majority";

//Connect to MongoDB database
mongoose
	.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to database");
	})
	.catch(() => {
		console.log("Error Connected to database");
	});

// A schema matched the table in your database
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

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String}
});

const Record = mongoose.model('manga', mangaSchema);
const User = mongoose.model('user', userSchema);

module.exports.Record = Record;
module.exports.User = User;