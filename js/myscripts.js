

var tier1, tier2, tier3, tier4, meter_rate;






function calcTier1(Water_Usage1){
  
 if (Water_Usage1 < 4001){
   tier1 = Water_Usage1;
 }

 else {
  tier1 = 4000;
}

return tier1;
};

function calcTier2(Water_Usage2){
  
 if (Water_Usage2 < 4001){
   tier2 = 0;
 }

 else if ((Water_Usage2 - 4000) < 6001){
  tier2 = Water_Usage2 - 4000
}

else {
  tier2 = 6000;
}

return tier2;
};


function calcTier3(Water_Usage3){
  
 if (Water_Usage3 < 10000){
   tier3 = 0;
 }

 else if ((Water_Usage3 - 10000) > 5000){
  tier3 = 5000;
}

else {
  tier3 = (Water_Usage3 - (tier1+tier2));
}

return tier3;
};


function calcTier4(Water_Usage4){

 if (Water_Usage4 < 15000){
   tier4 = 0;
 }

 else {
  
  tier4 = (Water_Usage4 - (tier1+tier2+tier3));
}

return tier4;
};


function calcMeterSizeRate(Meter_Size){

 if (Meter_Size == 1){
   meter_rate = 5.12;
 }

 else if (Meter_Size == 2){
   meter_rate = 7.07;
 }

 else if (Meter_Size == 3){
   meter_rate = 10.28;
 }

 else if (Meter_Size == 4){
   meter_rate = 19.14;
 }

 else if (Meter_Size == 5){
   meter_rate = 31.14;
 }

 else if (Meter_Size == 6){
   meter_rate = 72.93;
 }

 else if (Meter_Size == 7){
   meter_rate = 121.17;
 }

 else {
  meter_rate = 0.00;
}

return meter_rate;
};



	//Change image when gallon slider moves
	function changeSpotColor() {
    var image = document.getElementById('myImage');
    if (image.src.match("bulbon")) {
      image.src = "../images/water-calculator-sprite.png";
    } else {
      image.src = "../images/water-calculator-sprite.png";
    }
  };



  //Prevent user from typing letters into textbox
  function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else{
      
      return true;
    }
    
  }


  function myFunction(){

  //Grab the number of gallons.
  var w = parseInt(document.getElementById("gallon_calc_input").value);

  //Grab the meter size.
  var metersize_calc_input = document.getElementById("metersize_calc_input");
  var x = metersize_calc_input.options[metersize_calc_input.selectedIndex].value;

  if (isNaN(w)){
    w = 0;
      //document.getElementById("gallon_calc_input").value = 0;
    }

    w *= 100; //Calculate usage charge

    var amount1 = calcTier1(w);//Pass water usage to determine tier1 amount
    var amount2 = calcTier2(w);//Pass water usage to determine tier2 amount
    var amount3 = calcTier3(w);//Pass water usage to determine tier3 amount
    var amount4 = calcTier4(w);//Pass water usage to determine tier4 amount



    //Pass tier usage amounts to text box
    document.getElementById('tier1').innerHTML = numeral(amount1).format('0,0');
    document.getElementById('tier2').innerHTML = numeral(amount2).format('0,0');
    document.getElementById('tier3').innerHTML = numeral(amount3).format('0,0');
    document.getElementById('tier4').innerHTML = numeral(amount4).format('0,0');
    

    //Calculate Usage (In Gallons) Sum
    var usage_sum = (amount1 + amount2 + amount3 + amount4);
    document.getElementById('usage_sum').innerHTML = numeral(usage_sum).format('0,0');


    //Calculate the Usage Charge for each tier
    var usage_charge1 = ((amount1 * 1.87)/1000);
    var usage_charge2 = ((amount2 * 4.13)/1000);
    var usage_charge3 = ((amount3 * 5.81)/1000);
    var usage_charge4 = ((amount4 * 8.2)/1000);


     //Pass the Usage Charge for each tier to the textbox
     
     document.getElementById('tier1_uc').innerHTML = numeral(usage_charge1.toFixed(2)).format('$0,0.00');
     document.getElementById('tier2_uc').innerHTML = numeral(usage_charge2.toFixed(2)).format('$0,0.00');
     document.getElementById('tier3_uc').innerHTML = numeral(usage_charge3.toFixed(2)).format('$0,0.00');
     document.getElementById('tier4_uc').innerHTML = numeral(usage_charge4.toFixed(2)).format('$0,0.00');
     

    //Calculate Usage Charge total sum
    var total_usage_charges = (usage_charge1 + usage_charge2 + usage_charge3 + usage_charge4).toFixed(2);


    //Determine the base charge based on the meter size that is selected
    var total_base_charges = calcMeterSizeRate(metersize_calc_input.selectedIndex);


    //Pass the total usage charge to the textbox
    document.getElementById('usage_charge_sum').innerHTML = numeral(total_usage_charges).format('$0,0.00');
    document.getElementById('total_usage_charge').innerHTML = numeral(total_usage_charges).format('$0,0.00');
    
    
    //Pass the total base charge to the textbox
    document.getElementById('total_base_charge').innerHTML = numeral(total_base_charges).format('$0,0.00');


    //Calculate the total estimated water charges
    var total = (parseFloat(total_usage_charges) + parseFloat(total_base_charges));


    //Pass the total estimated water charges to the textbox
    document.getElementById('total_water_charges').innerHTML = numeral(total).format('$0,0.00');
    

    var div = document.getElementById("estimated_total");
    div.textContent = numeral(total).format('$0,0.00');

  };
  
  $(document).foundation();
  