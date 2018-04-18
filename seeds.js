const   mongoose = require('mongoose'),
        faker = require('faker');

const   Custs = require('./models/custs'),
        Opps = require('./models/opps');


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
    for(let i=0; i<5; i++){
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
        Opps.create({
            custNum: i, 
            salesRep: faker.name.firstName(),
            closeDate: dateIn, 
            oppName: faker.company.catchPhrase(),
            address: faker.address.streetAddress(),
            qqType: "address only",
            structure: "main house",
            panel1: "GulfRib",
            panel2: "",
            hem: "N/A"
        })
    };
};

module.exports = seedDB;