var expr = require('express');
var app = expr();
var cons = require('consolidate');
var route = require('routes');
var logic = require('./logicserver.js');
var gateutil = require('./gateway_utils.js');

app.get('/route/:data', function(req, res) 
{
	var x = req.params.data.split(',');
	var src = x[0];		var dest = x[1];		var app_key = x[2];	
	var t;

	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}		

		mongo_client.connect('mongodb://localhost:27017/application', function(err, dbcon) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			dbcon.collection('data').findOne({key:app_key}, function(err, doc) {
				if(err) {
					console.log(err.message);
					return db.close();
				}
				if(doc == null) {
					dbcon.close();	
					res.send("Unauthorized app");
					return;
				}

				// console.log(doc);
				logic.getBuses(src, dest, function(busno, speed, last_location) {

					var len = speed.length;
					var location = [];
					var index = 0;

					var cursor = db.collection('locations').find({sname:{$in:last_location}}, {_id:false});
					cursor.each(function(err, doc) {
						if(err) {
							console.log(err.message);
							return db.close();
						}		
						if(doc == null)	{ 
							db.close(); 
							result = {busid:busno, pace:speed, last_stop:location};
							console.log(result);
							res.send(result);					
							return;
						}

						// console.log(doc);
						location[index++] = doc.location.lat;
						location[index++] = doc.location.lon;
					});
					
				});
			});
		});
	});

	console.log('Request arrived at page: /route');
});

/*app.get('/insertdata/:data', function(req, res)
{
	console.log(req.params.data);
	res.send("Data recieved");
	console.log('Request arrived at page: /insertdata');		
});


app.get('/insertdata', function(req, res)
{
	//console.log(req.params.data);
	res.send("request sucessfully receivd from sensor");
	console.log('request sucessfully receivd from sensor');		
});

*/

app.get('/appstore/:data', function(req, res)
{
	// console.log(req.params.data);
	var low, high, app_key = "";
	low = 101, high = 199;
	var x = Math.floor(low + (high-low)*Math.random());
	low = 201, high = 799;
	var y = Math.floor(low + (high-low)*Math.random());
	app_key = x + "zh" + y + "rc";

	var mongo_client = require('mongodb').MongoClient;
				
	mongo_client.connect('mongodb://localhost:27017/application', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}		

		db.collection('data').insert({name:req.params.data, key:app_key});
		db.close();
		res.send(app_key);
	});
	
	console.log('Request arrived at page: /appstore');
});


app.get('/register', function(req, res)
{
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + "/views");
	
	res.render('register');
	console.log('Request arrived at page: /register');
});

app.get('/putdata/:data', function(req, res)
{
	console.log(req.params.data);
	var x = req.params.data.split(',');
	var app_name = x[0];
	var app_key = x[1];

	var mongo_client = require('mongodb').MongoClient;
				
	mongo_client.connect('mongodb://localhost:27017/application', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}		

		db.collection('data').insert({name:app_name, key:app_key});
		db.close();
	});

	res.send('Reg SUCCESS !! Key is: ' + x[1]);

	console.log('Request arrived at page: /putdata');
});

app.get('*', function(req, res)
{
	res.send("INFINITY");
	console.log('Request arrived at page: /INFINITY');
});


app.listen(8090);
console.log("Server listening at port 8090");