const   express = require('express'),
        router = express.Router();
        
const   Opps = require('../models/opps'),
        Custs = require('../models/custs'),
        Notes = require('../models/notes');
        
//INDEX
router.get("/opps", function(req,res){
    Opps.find({}).populate("status").exec(function(err, allOpps){
        if(err){
            console.log(err);
        } else {
            res.render("opps/index", {opps: allOpps});
        }
    });
});

//CREATE
router.post("/opps", isLoggedIn, function(req,res){
    let newOpp = {  salesRep: req.body.salesRep, 
                    closeDate: req.body.closeDate, 
                    oppName: req.body.oppName,
                    address: req.body.address,
                    qqType: req.body.qqType,
                    structure: req.body.structure,
                    panel1: req.body.panel1,
                    panel1Coverage: req.body.coverage1,
                    panel2: req.body.panel2,
                    panel2Coverage: req.body.coverage2,
                    hem: req.body.hem,
    };
        Opps.create(newOpp, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                newlyCreated.cust.num = req.body.custNum;
                newlyCreated.author.id = req.user._id;
                newlyCreated.author.initials = req.body.salesRep;
                newlyCreated.qqId = getQQID(req.user.initials, 15);
                newlyCreated.save();
                res.redirect("/opps");
            }
        });
});

//NEW
router.get("/opps/new", isLoggedIn, function(req,res){
            res.render("opps/new");
});


//SHOW
router.get("/opps/:id", function(req, res) {
    Opps.findById(req.params.id).exec(function(err, foundOpp){
        if(err) {
            console.log(err);
        } else if(req.user.role == "cad" || req.user.role == "admin"){
            Notes.find({'opp.id': req.params.id}).sort({timeIn: -1}).exec(function(err, notes){
                if(err) {
                    console.log(err);
                } else {
                    res.render('opps/show', {opp: foundOpp, notes: notes})
                } 
            })
        } else {
            Notes.find({'opp.id': req.params.id, flagCad: {$nin: "on"}}).sort({timeIn: -1}).exec(function(err, notes){
                if(err) {
                    console.log(err);
                } else {
                    res.render('opps/show', {opp: foundOpp, notes: notes})
                }
            })
        }
    })
})

//EDIT
router.get("/opps/:id/edit", isLoggedIn, function(req, res){
    Opps.findById(req.params.id, function(err, foundOpp){
        if(err){
            console.log(err);
            res.redirect("/opps")
        } else {
            res.render("opps/edit", {opp: foundOpp})
        }
    })
});

//UPDATE
router.put("/opps/:id", isLoggedIn, function(req, res){
    Opps.findByIdAndUpdate(req.params.id, req.body.opp, function(err, updatedOpp){
        if(err){
            res.redirect("/opps");
        } else {
            res.redirect("/opps")
            // res.redirect("/opps/" + req.params.id)
        }
    })
})

//DESTROY
router.delete("/opps/:id", function(req,res){
    Opps.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/opps");
        } else {
            res.redirect("/opps");
        }
    })
})


//AJAX
router.post('/df', function(req,res){
    console.log(req.body.custNum);
    Custs.findOne({'num':req.body.custNum},function(err, foundItem){
        if(err){
            console.log(err);
        } else if(foundItem) {
            res.send(foundItem.name);
        } else {
            res.send("NUMBER NOT FOUND")
        }
    });
});



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function getQQID(init, count){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yy = today.getFullYear().toString().slice(1,3);
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    return mm + dd + yy + '-' + init + count;
}


module.exports = router;