export default function totalPhoneBill(callSMS, callPrice, smsPrice){
    if (!callSMS) {
        return 0.00; // Return 0 if callSMS is not provided or is empty
      }
  var bill = callSMS.split(',');
    var totalCost = 0;
    for (let i = 0; i < bill.length; i++){
      const prod = bill[i].trim();
      //console.log(prod);
      if (prod.includes('call')){
      totalCost = totalCost + callPrice;
      } else if (prod.includes('sms')){
      totalCost = totalCost + smsPrice;
      }
    }
    return totalCost.toFixed(2);
  }