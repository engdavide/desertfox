const   express = require('express'),
        router = express.Router(),
        csv = require('fast-csv'),
        fs = require('fs'),
        path = require('path'),
        multer = require('multer'),
        passport = require('passport');
   
const   Opps = require('../models/opps'),
        Notes = require('../models/notes'),
        Users = require('../models/users'),
        Products = require('../models/products');

//HOME
router.get("/", function(req,res){
    res.render("home");
});

//CSV uploads
let csvFile = path.join(__dirname , '../', 'public/products.csv');
let stream = fs.createReadStream(csvFile);

router.get('/upload', function(req, res, next){
    res.render('upload');
}).get('/import', function(req,res,next){
    let products = [];
    let csvStream = csv()
        .on('data', function(data){
            Products.remove({}, function(err){
                if(err){
                    console.log(err)
                } else {
                }
            });
            var item = new Products({
                stockCode: data[0],
                colorCode: data[1],
                productCode: data[2],
                gauge: data[3],
                priceCode: data[4],
                sellingPrice: data[5],
                description: data[6],
            });
        item.save(function(err){
            if(err){
                console.log(err);
            }
        });
    }).on('end', function(){
        console.log('file import complete');
    });
    stream.pipe(csvStream);
    res.json({success: 'data import successful', status: 200});
}).get('/fetchdata', function(req, res, next){
    Products.find({}, function(err, docs){
        if(err){
            console.log(err);
        } else {
            res.json({success: 'update success', status: 200, data: docs});
        }
    });
});


let storage = multer.diskStorage({
        destination: function(req, file, cb){
                cb(null, './public/');
        },
        filename: function(req, file, cb){
                cb(null, 'products.csv');
        }
});

let upload = multer({storage: storage}).single("productsCsv");

router.post('/upload', upload, function(req, res){
        res.redirect('/upload');
});


//REGISTER
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req,res){
    let newUser = ({username: req.body.username, email: req.body.email});
    Users.register(newUser, req.body.password, function(err,userCB){
        if(err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req,res, function(){
                res.redirect('/opps');
            });
        }
    });
});

//LOGIN
router.get("/login", function(req,res){
    res.render('login');
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res){
        
});

//LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;