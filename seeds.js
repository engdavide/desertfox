const   mongoose = require('mongoose'),
        faker = require('faker');

const   Custs = require('./models/custs'),
        Opps = require('./models/opps'),
        Users = require('./models/users');


function seedDB(){
    Custs.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log('removed customers')
        }
    });
    Opps.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log('removed opps')
        }
    });
    Users.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log('removed opps')
        }
    });
    
    for(let i=0; i<2; i++){
        Custs.create({
            num: i,
            name: faker.company.companyName()
        });
    }

    for(let i=0; i<50; i++){
        let date = faker.date.future().getDate();
        let month = faker.date.future().getMonth();
        let year = faker.date.future().getFullYear();
        let dateIn = month + date + year
        
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
        today = mm + '/' + dd + '/' + yyyy;
        
        Opps.create({
            qqId: faker.finance.account(),
            custName: faker.company.companyName(),
            custNum: i, 
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
        })
    };

        Users.create({
            username: "admin",
            password: "password",
            role: "admin",
            initials: "AA"
        });
        
        Users.create({
            username: "sales",
            password: "password",
            role: "sales",
            initials: "SS"
        });
        
        Users.create({
            username: "cad",
            password: "password",
            role: "cad",
            initials: "CC"
        });
    
    
};

module.exports = seedDB;