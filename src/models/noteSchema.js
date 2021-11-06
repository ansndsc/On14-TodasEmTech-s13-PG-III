//OBJETIVO:
//Construir bloco de notas
    //possuem notas[
        //NOTA: autora, título, data de criação e um id
        // {
        //    "id": "956232",
        //    "autora": "Ananda",
        //    "titulo": "CRUD",
        //    "data_de_criacao": "06/11/2021"
        // }
        //
    //]

const mongoose = require('mongoose')
    
const noteSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        author: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: new Date()
        }
    }
)

module.exports = mongoose.model('note', noteSchema)