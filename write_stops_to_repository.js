fs = require('fs')

fs.readFile('/home/ritesh/Desktop/IAS_Project/js/data', 'utf8', function (err,data) {
	if (err) {
  		return console.log(err);
  	}

	var mongo_client = require('mongodb').MongoClient;
	var x = data.split('\n');
  	var len = x.length;
 

	mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		for(i=0; i<len; i++) { 	
	  		if(x[i].length != 0) {
				var t = x[i].split('-');
				var curloc = t[1].split(',');
				// console.log(t[0] + "--->" + curloc[0] + "    " + curloc[1]);
				db.collection('locations').insert({sname:t[0], location:{lat:curloc[0],lon:curloc[1]}});
			}
		}

		db.close();
	});

});