let panel1Select = document.querySelector('select[name="panel1"]');
let coverage1Select = document.querySelector('select[name="coverage1"]');

let panel2Select = document.querySelector('select[name="panel2"]');
let coverage2Select = document.querySelector('select[name="coverage2"]');

let custNumSelect = document.querySelector('input[name="custNum"]');
let custNameOut = document.querySelector('#custName');

//Custs passed as custs from routes/opps.js...but not getting to this JS file. need to fix... TODO
custNumSelect.addEventListener('change', function (){
    let cust = getCustNum();
    custNameOut.textContent = cust.name

});




panel1Select.addEventListener('change', function(){
    if(this.value=="GulfRib" || this.value=="GulfPBR"){
        coverage1Select.innerHTML = '<option value="36\"">36"</option>';
    } else if(this.value=="5VCrimp") {
        coverage1Select.innerHTML = '<option value="24\"">24"</option>';
    } else if(this.value=="GulfLok") {
        coverage1Select.innerHTML = '<option value="16\"">16"</option>' +
                                    '<option value="12\"">12"</option>';
    } else if(this.value=="GulfSeam" || this.value=="VersaLoc" || this.value=="MegaLoc") {
        coverage1Select.innerHTML = '<option value="16\"">16"</option>' +
                                    '<option value="18\"">18"</option>' + 
                                    '<option value="14\"">14"</option>' ;
    }
});

panel2Select.addEventListener('change', function(){
    if(this.value=="GulfRib" || this.value=="GulfPBR"){
        coverage2Select.innerHTML = '<option value="36\"">36"</option>';
    } else if(this.value=="5VCrimp") {
        coverage2Select.innerHTML = '<option value="24\"">24"</option>';
    } else if(this.value=="GulfLok") {
        coverage2Select.innerHTML = '<option value="16\"">16"</option>' +
                                    '<option value="12\"">12"</option>';
    } else if(this.value=="GulfSeam" || this.value=="VersaLoc" || this.value=="MegaLoc") {
        coverage2Select.innerHTML = '<option value="16\"">16"</option>' +
                                    '<option value="18\"">18"</option>' + 
                                    '<option value="14\"">14"</option>' ;
    }
});



