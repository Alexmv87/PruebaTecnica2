const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    Titulo: {type: String},
    Sinopsis: {type: String},
    Actores: [{type: String}],
    Image: {type: String},
    Categorias: [{type: String}]
},
{
    timestamps:true
})
const con = mongoose.connect('mongodb://127.0.0.1:27017/Movies')
const movie = mongoose.model("movies", movieSchema)

module.exports = {movie: movie, con: con}

