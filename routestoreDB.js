
var mongo_client = require('mongodb').MongoClient;

mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
	if(err) {
		console.log(err.message);
		return db.close();
	}

	db.collection('routestore').insert({sname:'Lingampally',route:[1,5,9]});
	db.collection('routestore').insert({sname:'IIIT',route:[1,2,5,6,9,10]});
	db.collection('routestore').insert({sname:'Gachibowli',route:[1,5,9]});
	db.collection('routestore').insert({sname:'Biodiversity Park',route:[1,5,9]});
	db.collection('routestore').insert({sname:'Mehdipatnam',route:[1,5,9]});
	db.collection('routestore').insert({sname:'Lakdikapul',route:[1,3,5,7,9,11]});
	db.collection('routestore').insert({sname:'CapGemini',route:[2,6,10]});
	db.collection('routestore').insert({sname:'Wipro Circle',route:[2,6,10]});
	db.collection('routestore').insert({sname:'Kothaguda',route:[2,4,6,8,10,12]});
	db.collection('routestore').insert({sname:'Rajiv Gandhi Statue',route:[3,7,11]});
	db.collection('routestore').insert({sname:'Khairatabad',route:[3,7,11]});
	db.collection('routestore').insert({sname:'Nampally',route:[3,7,11]});
	db.collection('routestore').insert({sname:'Surya Enclave',route:[4,8,12]});
	db.collection('routestore').insert({sname:'Hotel Jubilee Ridge',route:[4,8,12]});
	db.collection('routestore').insert({sname:'Vijaya Diagnostic',route:[4,8,12]});
	db.collection('routestore').insert({sname:'Jubilee Hills',route:[4,8,12]});
	
});