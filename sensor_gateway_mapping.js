// Assumption gateway_id already exists
exports.addSensorsToGateway = function (gateway_id, sensor_ids)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return ;
		}

		db.collection('mapping').update({gid:gateway_id}, {$pushAll: {sidlist: sensor_ids}}, function(err, res) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
		});

	});
}


// Assumption gateway_id already exists
exports.removeSensorsFromGateway = function (gateway_id, sensor_ids)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return ;
		}

		db.collection('mapping').update({gid:gateway_id}, {$pullAll: {sidlist: sensor_ids}}, function(err, res) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
		});

	});
}
