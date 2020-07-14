const mongoose = require('mongoose');
const { Double } = require('bson');

const db = "mongodb+srv://ShenLoong99:123@webapiassignment-x0qmy.mongodb.net/MangaAPI?retryWrites=true&w=majority";

mongoose
.connect(db)
.then(() => {
    console.log("Connected to database");
}
)
.catch(() => {
    console.log("Error connecting database");
}
)

// A schema matched the table in your database
const mangaSchema = new mongoose.Schema({
    mangaName: {type: String},
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
}
);

const Record = mongoose.model('manga', mangaSchema);

module.exports = Record;