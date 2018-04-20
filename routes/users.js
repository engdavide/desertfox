const   express = require('express'),
        router = express.Router();
        
const   Opps = require('../models/opps'),
        Custs = require('../models/custs'),
        Notes = require('../models/notes'),
        Users = require('../models/users');
        
//INDEX
router.get("/users", function(req,res){
    Users.find({}).populate("status").exec(function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("users/index", {users: allUsers});
        }
    });
});


//SHOW
router.get("/users/:id", function(req, res) {
    Users.findById(req.params.id).populate("notes").exec(function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            res.render('users/show', {user: foundUser})
        }
    })
})

//EDIT
router.get("/users/:id/edit", isLoggedIn, function(req, res){
    Users.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            res.redirect("/users")
        } else {
            res.render("users/edit", {user: foundUser})
        }
    })
});

//UPDATE
router.put("/users/:id", isLoggedIn, function(req, res){
    Users.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            res.redirect("/users");
        } else {
            res.redirect("/users")
            // res.redirect("/users/" + req.params.id)
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;