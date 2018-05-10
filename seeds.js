const   mongoose = require('mongoose'),
        faker = require('faker');

const   Custs = require('./models/custs'),
        Opps = require('./models/opps'),
        Users = require('./models/users'),
        Notes = require('./models/notes');


function clearAll(){
    Custs.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
        }
    });
    Opps.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
        }
    });
    Notes.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
        }
    });   
}

function genCusts(num){
    for(let i=0; i<num; i++){
        Custs.create({
            num: i,
            name: faker.company.companyName()
        });
    }
}

function getFutureDate(){
    let dd = faker.date.future().getDate();
    let mm = faker.date.future().getMonth();
    let yyyy = faker.date.future().getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    return mm + '/' + dd + '/' + yyyy;
}

function getToday(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    return mm + '/' + dd + '/' + yyyy;
}

function genOpps(num){
    for(let i=0; i<num; i++){
        
        let dateIn = getFutureDate()
        let today = getToday()
        
        
        let randCustNum = Math.floor(Math.random()*num);
        let newOpp = {
            qqId: faker.finance.account(),
            salesRep: faker.name.firstName(),
            closeDate: dateIn, 
            oppName: faker.company.catchPhrase(),
            address: faker.address.streetAddress(),
            qqType: "address only",
            structure: "main house",
            panel1: "GulfRib",
            panel1Coverage: "36",
            panel2: "",
            hem: "N/A",
            status: [{name: "Submitted",
                    time: today}]
        }
        
        Opps.create(newOpp, function(err, opp){
            if(err){
                console.log(err);
            } else {
                opp.cust.num = randCustNum;
                opp.save()
            }
        })
        
    };    
}


function seedDB(){
    clearAll();
    genCusts(500);
    genOpps(1000);
    console.log("seeded");

};

module.exports = seedDB;