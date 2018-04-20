const   express = require('express'),
        router = express.Router();
        
const   Opps = require('../models/opps'),
        Quotes = require('../models/quotes'),
        Custs = require('../models/custs'),
        Lines = require('../models/lines');

//INDEX
router.get("/quotes", function(req,res){
    Quotes.find({}, function(err, allQuotes){
        if(err){
            console.log(err);
        } else {
            res.render("quotes/index", {quotes: allQuotes});
        }
    });
});

//CREATE
router.post("/quotes", isLoggedIn, function(req,res){
    let newQuote = {totalPrice: req.body.totalPrice, 
    };
        Quotes.create(newQuote, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                // TODO: Add associations here later
                res.redirect("/quotes");
            }
        });
});

//NEW
router.get("/quotes/new", isLoggedIn, function(req,res){
    Quotes.find({}, function(err, allQuotes){
        if(err){
            console.log(err);
        } else {
            console.log(allQuotes)
            res.render("quotes/new", {quotes: allQuotes});
        }
    });
});

// //SHOW
// router.get("/opps/:id", function(req, res) {
//     Opps.findById(req.params.id).populate("notes").exec(function(err, foundOpp){
//         if(err) {
//             console.log(err);
//         } else {
//             res.render('opps/show', {opp: foundOpp})
//         }
//     })
// })

// //EDIT
// router.get("/opps/:id/edit", isLoggedIn, function(req, res){
//     Opps.findById(req.params.id, function(err, foundOpp){
//         if(err){
//             console.log(err);
//             res.redirect("/opps")
//         } else {
//             res.render("opps/edit", {opp: foundOpp})
//         }
//     })
// });

// //UPDATE
// router.put("/opps/:id", isLoggedIn, function(req, res){
//     Opps.findByIdAndUpdate(req.params.id, req.body.opp, function(err, updatedOpp){
//         if(err){
//             res.redirect("/opps");
//         } else {
//             res.redirect("/opps")
//             // res.redirect("/opps/" + req.params.id)
//         }
//     })
// })

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;