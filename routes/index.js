const   express = require('express'),
        router = express.Router(),
        passport = require('passport');
   
const   Opps = require('../models/opps'),
        Notes = require('../models/notes'),
        Users = require('../models/users');

//HOME
router.get("/", function(req,res){
    res.render("home");
});

//UPLOADS need to fix this....
router.get('/public/uploads/:id', function(req,res){
    let filename = req.params.id;
    let path = __dirname
    path = path.resolve(__dirname, '.../public/uploads/')
    console.log(path);
    console.log(filename);
    res.sendFile(path+filename);
})

//REGISTER
router.get('/register', function(req, res) {
    res.render('register');
})

router.post('/register', function(req,res){
    let newUser = ({username: req.body.username});
    Users.register(newUser, req.body.password, function(err,userCB){
        if(err){
            console.log(err);
            return res.render('register')
        } else {
            passport.authenticate('local')(req,res, function(){
                res.redirect('/opps');
            })
        }
    })
})

//LOGIN
router.get("/login", function(req,res){
    res.render('login');
})

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
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;