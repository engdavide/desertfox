const   mongoose = require("mongoose");

const   Users =require('../models/users')

let notesSchema = mongoose.Schema({
    text: String,
    flagCad: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            username: String
            },
    files: {type: Array, default: [] },
    timeIn: {type: Date, default: Date.now },
        
})

module.exports = mongoose.model("Notes", notesSchema)



