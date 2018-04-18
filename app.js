const   express = require('express'),
        request = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose');
        
const   Opps = require('./models/opps'),
        Custs = require('./models/custs'),
        seedDB = require('./seeds');

const   oppsRoutes = require('./routes/opps');
const   indexRoutes = require('./routes/index');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/desertfox");


//AUTH CONFIG HERE...
seedDB();




app.use(oppsRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("It's alive!");
})