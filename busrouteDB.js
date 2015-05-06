
var mongo_client = require('mongodb').MongoClient;

mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
	if(err) {
		console.log(err.message);
		return db.close();
	}

	db.collection('busroutes').insert({busno:1,route:['Lingampally','IIIT','Gachibowli','Biodiversity Park','Mehdipatnam','Lakdikapul']});
	db.collection('busroutes').insert({busno:2,route:['Lingampally','IIIT','Gachibowli','Biodiversity Park','Mehdipatnam','Lakdikapul']});
	db.collection('busroutes').insert({busno:3,route:['Lingampally','IIIT','Gachibowli','Biodiversity Park','Mehdipatnam','Lakdikapul']});
	db.collection('busroutes').insert({busno:4,route:['Lingampally','IIIT','Gachibowli','Biodiversity Park','Mehdipatnam','Lakdikapul']});

	db.collection('busroutes').insert({busno:5,route:['CapGemini','Wipro Circle','IIIT','Kothaguda']});
	db.collection('busroutes').insert({busno:6,route:['CapGemini','Wipro Circle','IIIT','Kothaguda']});
	db.collection('busroutes').insert({busno:7,route:['CapGemini','Wipro Circle','IIIT','Kothaguda']});
	db.collection('busroutes').insert({busno:8,route:['CapGemini','Wipro Circle','IIIT','Kothaguda']});

	db.collection('busroutes').insert({busno:9,route:['Rajiv Gandhi Statue','Khairatabad','Lakdikapul','Nampally']});
	db.collection('busroutes').insert({busno:10,route:['Rajiv Gandhi Statue','Khairatabad','Lakdikapul','Nampally']});
	db.collection('busroutes').insert({busno:11,route:['Rajiv Gandhi Statue','Khairatabad','Lakdikapul','Nampally']});
	db.collection('busroutes').insert({busno:12,route:['Rajiv Gandhi Statue','Khairatabad','Lakdikapul','Nampally']});

	db.collection('busroutes').insert({busno:13,route:['Kothaguda','Surya Enclave','Hotel Jubilee Ridge','Vijaya Diagnostic','Jubilee Hills']});
	db.collection('busroutes').insert({busno:14,route:['Kothaguda','Surya Enclave','Hotel Jubilee Ridge','Vijaya Diagnostic','Jubilee Hills']});
	db.collection('busroutes').insert({busno:15,route:['Kothaguda','Surya Enclave','Hotel Jubilee Ridge','Vijaya Diagnostic','Jubilee Hills']});
	db.collection('busroutes').insert({busno:16,route:['Kothaguda','Surya Enclave','Hotel Jubilee Ridge','Vijaya Diagnostic','Jubilee Hills']});

});
