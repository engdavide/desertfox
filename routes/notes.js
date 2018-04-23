const   express = require('express'),
        multer = require('multer'),
        fs = require('fs'),
        router = express.Router({mergeParams: true});

const   Opps = require('../models/opps'),
        Notes = require('../models/notes');
        
router.get("/opps/:id/notes/new", function(req,res){
    Opps.findById(req.params.id, function(err, opp){
            if(err){
                    console.log(err)
            } else {
                    res.render('notes/new', {opp: opp});
            }
    })
});


let notesStorage = multer.diskStorage({
        destination: function(req, file, cb){
                cb(null, './public/uploads/');
        },
        filename: function(req, file, cb){
                cb(null, Date.now() + '-' + file.originalname);
        }
});

let notesUpload = multer({storage: notesStorage}).array('files');

router.post('/opps/:id/notes', notesUpload, function(req,res,next){
        Opps.findById(req.params.id, function(err, opp){
                if(err){
                        console.log(err);
                        res.redirect('/opps/'+ opp._id);
                } else {
                        let newNote = { text: req.body.text,
                                        flagCad: req.body.flagCad,
                                        
                        }
                        Notes.create(newNote, function(err, note){
                                if(err){
                                        console.log(err);
                                }  else {
                                        note.author.id = req.user._id;
                                        note.author.username = req.user.username;
                                        for(let i=0;i<req.files.length;i++){
                                                let arr = {
                                                        "name": req.files[i].originalname,
                                                        "url": req.files[i].path.substring(7),
                                                        //truncate to drop "/public" from the path
                                                        //this matches the express.staic routes from app.js
                                                }
                                                console.log(arr);
                                                note.files.push(arr);
                                        }
                                        note.save();
                                        opp.notes.push(note);
                                        opp.save();
                                        res.redirect("/opps/" + opp._id);
                                }
                        })
                }
        })
});


module.exports = router;