const   mongoose = require("mongoose");

const   Users =require('../models/users')

let notesSchema = mongoose.Schema({
    text: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            username: String
            }
})

module.exports = mongoose.model("Notes", notesSchema)



