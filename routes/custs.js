const   express = require('express'),
        router = express.Router();
        
const   Custs = require('../models/custs');
        

        
//INDEX
router.get("/custs", function(req,res){
    Custs.find({}, function(err, allItems){
        if(err){
            console.log(err);
        } else {
            res.render("custs/index", {custs: allItems});
        }
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;