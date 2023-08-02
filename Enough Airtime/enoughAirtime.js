export default function enoughAirtime(cost, airtime){
    var productCost = cost.split(',');
      var cost1 = 0;
       for (let i = 0; i < productCost.length; i++){
        var usage = productCost[i].trim();
        if (usage === 'call'){
        cost1 = cost1 + 1.88;
        } else if (usage === 'data'){
        cost1 = cost1 + 12;
        } else if (usage === 'sms'){
        cost1 = cost1 + 0.75;
        }
      }
      //var airtime1 = 'R16.98';
      var none = 0;
      if (airtime - cost1 > 0){
      return 'R' + (airtime - cost1).toFixed(2);
      } else {
      return 'R' + none.toFixed(2);
      }
    }