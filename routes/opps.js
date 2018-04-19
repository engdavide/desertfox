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
router.post("/opps", function(req,res){
    let newOpp = {  custNum: req.body.custNum, 
                    salesRep: req.body.salesRep, 
                    closeDate: req.body.closeDate, 
                    oppName: req.body.oppName,
                    address: req.body.addresss,
                    qqType: req.body.qqType,
                    structure: req.body.structure,
                    panel1: req.body.panel1,
                    panel2: req.body.panel2,
                    hem: req.body.hem,
    };
        Opps.create(newOpp, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                // TODO: Add associations here later
                res.redirect("/opps");
            }
        });
});

//NEW
router.get("/opps/new", function(req,res){
    Custs.find({}, function(err, allCusts){
        if(err){
            console.log(err);
        } else {
            console.log(allCusts)
            res.render("opps/new", {custs: allCusts});
        }
    });
});

//SHOW
router.get("/opps/:id", function(req, res) {
    Opps.findById(req.params.id).populate("notes").exec(function(err, foundOpp){
        if(err) {
            console.log(err);
        } else {
            res.render('opps/show', {opp: foundOpp})
        }
    })
})

//EDIT
router.get("/opps/:id/edit", function(req, res){
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
router.put("/opps/:id", function(req, res){
    Opps.findByIdAndUpdate(req.params.id, req.body.opp, function(err, updatedOpp){
        if(err){
            res.redirect("/opps");
        } else {
            res.redirect("/opps")
            // res.redirect("/opps/" + req.params.id)
        }
    })
})



module.exports = router;