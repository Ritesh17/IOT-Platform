var mongo_client = require('mongodb').MongoClient;

mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
	if(err) {
		console.log(err.message);
		return db.close();
	}

	num_sensors = 50;
	for(var i=1; i<=num_sensors; i++) {

		var rand_lat = Math.random()*100;
		var rand_lon = Math.random()*100;

		if(i%3 < 2)
			cur_type = 'numeric';
		else
			cur_type = 'float';

		db.collection('sensor').insert({'sid':i, 'time': new Date(), 'loc':{'lat':rand_lat, 'lon':rand_lon}, 'type':cur_type, 'status':'active'});
	}

	db.close();
});