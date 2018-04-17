const   express = require('express'),
        router = express.Router();
   
const Opps = require('../models/opps');


router.get("/", function(req,res){
    res.render("home");
});

module.exports = router;