/*
TODO:
        bring in SKU data--
        csv parser to json/mongo
        add email to user model
        refine products model and bring in real sku+price data from invMaster+
...update "fetch data" function to use data tables
quote/lines/products model tweak
build new quote view/form
tweak model for quotes
primary flag on quote, float value to opps
tweak lines model if needed
build ajax/jquery updates for quote form
print to PDF function
build upload csv option -- refactor upload routes/views?? Or upload routes within functional route page?
implement parser
customer upload
destroy opps/models, only your own unless admin
CAD comments
self service flag on opps
cleanup opps new
cleanup opps index
STYLE everything
auth logic on all routes
PW reset
think through UI/UX
analytics/timestamps for status
notifications/email on status change

DEMO

DEPLOY

*/



const   express = require('express'),
        request = require('request'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        methodOverride = require('method-override'),
        multer = require('multer'),
        upload = multer({dest: './public/uploads/'}),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose');
        
const   Opps = require('./models/opps'),
        Custs = require('./models/custs'),
        Notes = require('./models/notes'),
        User = require('./models/users'),
        seedDB = require('./seeds');

const   oppsRoutes = require('./routes/opps'),
        indexRoutes = require('./routes/index'),
        notesRoutes = require('./routes/notes'),
        usersRoutes = require('./routes/users'),
        custsRoutes = require('./routes/custs'),
        quotesRoutes = require('./routes/quotes');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Serve upload files
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

//AUTH CONFIG HERE...
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/desertfox");

//Pass user to all routes...
app.use(function(req,res, next){
        res.locals.currentUser = req.user;
        next();
})

seedDB();




app.use(oppsRoutes);
app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);
app.use(quotesRoutes);
app.use(custsRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("It's alive!");
})