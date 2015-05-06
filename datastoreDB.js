
var mongo_client = require('mongodb').MongoClient;

mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
	if(err) {
		console.log(err.message);
		return db.close();
	}

	db.collection('datastore').insert({gid:1,sid:1,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Lingampally'}});
	db.collection('datastore').insert({gid:1,sid:2,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'IIIT'}});
	db.collection('datastore').insert({gid:1,sid:3,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Gachibowli'}});
	db.collection('datastore').insert({gid:1,sid:4,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Biodiversity Park'}});

	db.collection('datastore').insert({gid:2,sid:5,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'CapGemini'}});
	db.collection('datastore').insert({gid:2,sid:6,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Wipro Circle'}});
	db.collection('datastore').insert({gid:2,sid:7,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'IIIT'}});
	db.collection('datastore').insert({gid:2,sid:8,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Kothaguda'}});

	db.collection('datastore').insert({gid:3,sid:9,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Rajiv Gandhi Statue'}});
	db.collection('datastore').insert({gid:3,sid:10,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Khairatabad'}});
	db.collection('datastore').insert({gid:3,sid:11,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Lakdikapul'}});
	db.collection('datastore').insert({gid:3,sid:12,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Nampally'}});

	db.collection('datastore').insert({gid:4,sid:13,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Kothaguda'}});
	db.collection('datastore').insert({gid:4,sid:14,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Surya Enclave'}});
	db.collection('datastore').insert({gid:4,sid:15,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Hotel Jubilee Ridge'}});
	db.collection('datastore').insert({gid:4,sid:16,timestamp:new Date(),data:{speed:30+30*Math.random(),lastloc:'Vijaya Diagnostic'}});

});
