const   express = require('express'),
        request = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose');
        
const   opps = require('./models/opps');

const   oppsRoutes = require('./routes/opps');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/desertfox");


//AUTH CONFIG HERE...





app.use("oppsRoutes");

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("It's alive!")
})