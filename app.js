const pagarme = require('pagarme')
const api_key = "ak_test_vZz7BmZw9qfT6NJwk9Kubx2Q1odITG";
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
		pagarme.client.connect({ api_key: api_key })
		 .then(client => client.subscriptions.create({
		    amount: req.body.amount,
        plan_id: "246102",
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
		pagarme.client.connect({ api_key: api_key })
		  .then(client => client.subscriptions.create({
        amount: req.body.amount,
        plan_id: "246102",
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


app.post('/createTransaction',function (req,res) {
    pagarme.client.connect({ api_key: api_key })
     .then(client => client.transactions.capture({
        id: req.body.token,
        amount: 1000
      }))
      .then(transaction =>
        console.log(JSON.stringify(transaction))
      )
      .catch( error =>
        console.log(JSON.stringify(error))
      );
});

app.listen(8090, function() {
    console.log('localhost:8090');
});
