const pagarme = require('pagarme')
var app = require('./config/server')

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.render('site/checkout');
});

app.post('/createSubscription',function (req,res) {
	if (req.body.payment_method === 'credit_card'){
		const pagarme = require('pagarme')
		pagarme.client.connect({ api_key: 'ak_test_vZz7BmZw9qfT6NJwk9Kubx2Q1odITG' })
		 .then(client => client.transactions.create({
		    amount: req.body.amount,
        payment_method: req.body.payment_method,
		    card_hash: req.body.card_hash,
        customer: req.body.customer
      }))
		  .then(transaction =>
        console.log(JSON.stringify(transaction))
      )
		  .catch( error =>
        console.log(JSON.stringify(error))
      );

	} else {
		const pagarme = require('pagarme')
		pagarme.client.connect({ api_key: 'ak_test_vZz7BmZw9qfT6NJwk9Kubx2Q1odITG' })
		  .then(client => client.transactions.create({
        amount: req.body.amount,
		    payment_method: req.body.payment_method,
        customer: req.body.customer
      }))
		  .then(transaction =>
        console.log(JSON.stringify(transaction))
      )
		  .catch( error =>
        console.log(JSON.stringify(error))
      );
	}



});


app.listen(8090, function() {
    console.log('localhost:8090');
});
