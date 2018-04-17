const   express = require('express'),
        router = express.Router();
        
const   Opps = require('../models/opps')
        
router.get("/opps", function(req,res){
    Opps.find({}, function(err, allOpps){
        if(err){
            console.log(err)
        } else {
            res.render("opps/index", {opps: allOpps})
        }
    })
});

router.post("/opps", function(req,res){
    let custNum = req.body.custNum;
    let salesRep = req.body.salesRep;
    let closeDate = req.body.closeDate;
    let oppName = req.body.oppName;
    let newOpp = {custNum: custNum, salesRep: salesRep, closeDate: closeDate, oppName: oppName};
        Opps.create(newOpp, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                // TODO: Add associations here later
                res.redirect("/opps");
            }
        })
});

router.get("/opps/new", function(req,res){
    res.render("opps/new")
})


module.exports = router;