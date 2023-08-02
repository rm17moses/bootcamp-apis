import express from 'express';
import longestWord from './Word Game/longestWord.js';
import shortestWord from './Word Game/shortestWord.js';
import wordLengths from './Word Game/wordLengths.js';
import totalPhoneBill from './Total Phone Bill/totalPhoneBill.js';
import enoughAirtime from './Enough Airtime/enoughAirtime.js';

const app = express();
app.use(express.json())
app.use(express.static('public'));

//WORD GAME

app.get('/api/word_game', function(req, res) {


   const sentence = req.query.sentence;

    if (!sentence) {
        res.json({
            error: 'No sentence to analyse'
        })
    }

    res.json({

        message : 'Analysing Sentence. Please Wait...', 
       "longestWord" : longestWord(sentence),
       "shortestWord": shortestWord(sentence),
        "sum" : wordLengths(sentence)
        
    });
    });

// TOTAL PHONE BILL API

let callPrice = 2.75;
let smsPrice = 0.65;

app.post('/api/phonebill/total', function(req, res) {
    const callSMS = req.body.callSMS;
    const total = totalPhoneBill(callSMS, callPrice, smsPrice);
  
    res.json({
      total: 'R' + total
    });
  });
  



app.get('/api/phonebill/prices', function(req, res) {

    res.json({
        call: 'R' + callPrice,
        sms: 'R' + smsPrice
    })
})

app.post('/api/phonebill/price', function(req, res) {
    const price = req.body.price;
    const type = req.body.type;
  
    if (type === 'call') {
      callPrice = price;
    } else if (type === 'sms') {
      smsPrice = price;
    } else {
      res.json({
        status: 'Unsuccessful',
        error: 'Invalid type entered/requested. Type should either be: call or sms'
      });
      return;
    }
  
    res.json({
      status: 'Success',
      message: `The ${type} price is set to R${price}`,
    });
  });
  
app.post('/api/enough', function(req, res) {
  const cost = req.body.cost;
  const airtime = req.body.airtime;
  const enough = enoughAirtime(cost, airtime)

  if (airtime === 0 || cost === '') {
    res.json({
      airtimeMess: 'Insufficient airtime entry',
      costMess: 'Invalid usage entry.'
    })
  }
  res.json({
    status: 'Success',
    enough: enough,
    messageSuccess: `Your remaining airtime is ${enough}`
  }) 
})




let PORT = process.env.PORT || 4007;

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}!`);
});