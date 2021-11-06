const NoteSchema = require('../models/noteSchema')
const mongoose = require('mongoose')

const getAll = async (req, res) => {
    try {
        const notes = await NoteSchema.find()
        res.status(200).json(notes)

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//criar metodo para cadastrar uma nota
const createNote = async (req, res) => {
    try {
        //acessar as informações enviadas no body da requisição
            //criar um novo schema da nota          
        //
        const newNote = new NoteSchema({
            _id: new mongoose.Types.ObjectId(),
            author: req.body.author,
            title: req.body.title
        })
        //salvar essa nota no meu banco de dados
        const savedNote = await newNote.save()
        
        //envio uma resposta pra requisição
        res.status(201).json({
            message: "Nota salva com sucesso.", savedNote
        }) //importante enviar o que foi salvo e não o que foi enviado na request
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }        
}

//criar metodo para atualizar informações de uma nota
const updateNote = async (req, res) => {
    try {
        //selecionar a nota a ser alterada
        //encontrar a note selecionada
        let foundNote = await NoteSchema.findById(req.params.id)
        const bodyRequest = req.body
        //console.log(foundNote);
        //declarar quais informações podem ser alteradas
        if(foundNote) {
            foundNote.title = bodyRequest.title || foundNote.title
            foundNote.author = bodyRequest.author || foundNote.author
        }
        //salvar as informações alteradas
        const savedNote = await foundNote.save()
        console.log(savedNote);
        //enviar a resposta com as informações alteradas
        res.status(200).json({
            message: "Nota atualizada com sucesso.", savedNote
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAll,
    createNote,
    updateNote
}