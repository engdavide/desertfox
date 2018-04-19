const   mongoose = require("mongoose");

let notesSchema = mongoose.Schema({
    text: String,
    author: String
    // TODO Associate to user
})

module.exports = mongoose.model("Notes", notesSchema)



// author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },