document.addEventListener('alpine:init', () => {
    Alpine.data('bootcampFunctionsAPI', function () {
        return {

            sentence: '',
            longWord: '',
            shortWord: '',
            senMessage: '',
            message: '',
            length: '',
            bill: '',
            defSMSPrice: '',
            defCallPrice: '',
            total: '',
            prodType: 'call' || 'sms',
            newPrice: '',
            userPriceMessage: '',
            usage: '',
            available: 0,
            airtimeMess: '',
            costMess: '',
            messageSuccess: '',
            defaultCall: 'R2.75',
            defaultSMS: 'R0.65',
            open: false,
            show: false,
            prices: false,


            postEnoughAirtime() {
                axios.post('/api/enough', {
                    cost: this.usage,
                    airtime: this.available
                }).then(result => {
                    //console.log(result.data);
                    this.airtimeMess = result.data.airtimeMess;
                    this.costMess = result.data.costMess;
                    this.messageSuccess = result.data.messageSuccess;

                    setTimeout(() => {
                        this.airtimeMess = '';
                        this.costMess = '';
                        this.messageSuccess = '';
                    }, 3000)
                })
            },


            analyseSentence() {

                axios.get(`/api/word_game?sentence=${this.sentence}`)
                    .then(result => {
                        //console.log(result.data)
                        if (result.data.error) {
                            this.senMessage = result.data.error
                        } else {
                            this.message = result.data.message
                        }
                        this.longWord = result.data.longestWord;
                        this.shortWord = result.data.shortestWord;
                        this.length = result.data.sum;

                        setTimeout(() => {
                            this.senMessage = '';
                            this.message = '';
                        }, 7000)
                    })
            },

            billCost() {
                axios.post('/api/phonebill/total', {
                    callSMS: this.bill,
                }).then(result => {
                    //console.log(result.data)
                    this.total = result.data.total;
                });
            },

            prodPrices() {
                axios
                    .get('/api/phonebill/prices')
                    .then(result => {
                        this.defCallPrice = result.data.call;
                        this.defSMSPrice = result.data.sms;
                    })
            },

            userPrice() {

                if (this.newPrice === '') {
                    this.userPriceMessage = 'Please input a number';
                    setTimeout(() => {
                        this.userPriceMessage = '';
                    }, 3000)
                    return;
                }

                axios
                    .post('/api/phonebill/price', {
                        type: this.prodType,
                        price: +(this.newPrice)
                    }).then(result => {
                        if (result.data.status === 'Unsuccessful') {
                            this.userPriceMessage = result.data.error;
                        } else {
                            this.userPriceMessage = result.data.message
                        } setTimeout(() => {
                            this.userPriceMessage = '';
                        }, 5000)
                        return;

                    })
            },



            init() {

            },

        }
    })
})