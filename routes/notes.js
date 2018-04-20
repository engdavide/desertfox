const   express = require('express'),
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

router.post('/opps/:id/notes', function(req,res){
        Opps.findById(req.params.id, function(err, opp){
                if(err){
                        console.log(err);
                        res.redirect('/opps/'+ opp._id);
                } else {
                        Notes.create(req.body.note, function(err, note){
                                if(err){
                                        console.log(err);
                                }  else {
                                        note.author.id = req.user._id;
                                        note.author.username = req.user.username;
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