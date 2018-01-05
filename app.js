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
		pagarme.client.connect({ api_key: 'SUA_API_KEY' })
		 .then(client => client.subscriptions.create({
		    plan_id: 233543,
		    payment_method: req.body.payment_method,
		    card_hash: req.body.card_hash,
		    customer: {
		      email: req.body.customer.email,
		      name: req.body.customer.name,
		      address : {
			street: req.body.customer.address.street,
			street_number: req.body.customer.address.street_number, 
			zipcode: req.body.customer.address.zipcode,
			neighborhood: req.body.customer.address.neighborhood, 
			complementary: req.body.customer.address.complementary
		      }
		      
		    }}))
		  .then(subscription => console.log(subscription))
		  .catch( function(error) { console.log(error); } );
			
	} else {
		const pagarme = require('pagarme')
		pagarme.client.connect({ api_key: 'SUA_API_KEY' })
		  .then(client => client.subscriptions.create({
		    plan_id: 233543,
		    payment_method: req.body.payment_method,
		    customer: {
		      email: req.body.customer.email,
		      name: req.body.customer.name,
		      address : {
			street: req.body.customer.address.street,
			street_number: req.body.customer.address.street_number, 
			zipcode: req.body.customer.address.zipcode,
			neighborhood: req.body.customer.address.neighborhood, 
			complementary: req.body.customer.address.complementary
		      }
		      
		    }}))
		  .then(subscription => console.log(subscription))
		  .catch( function(error) { console.log(error); } );
	}
	
	

});


app.listen(8090, function() {
    console.log('localhost:8090');
});
