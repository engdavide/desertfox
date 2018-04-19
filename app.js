const   express = require('express'),
        request = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        methodOverride = require('method-override');
        
const   Opps = require('./models/opps'),
        Custs = require('./models/custs'),
        Notes = require('./models/notes'),
        seedDB = require('./seeds');

const   oppsRoutes = require('./routes/opps'),
        indexRoutes = require('./routes/index'),
        notesRoutes = require('./routes/notes');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/desertfox");


//AUTH CONFIG HERE...
seedDB();




app.use(oppsRoutes);
app.use(indexRoutes);
app.use(notesRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("It's alive!");
})