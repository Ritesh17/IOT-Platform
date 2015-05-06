var mongoose = require('mongoose');
var config = require('./config.js');
var routes = require('routes');
var gateutil = require('./gateway_utils.js');
var sg_mapping = require('./sensor_gateway_mapping.js');


autoincrementGid = function(callback) {
	var mongo_client = require('mongodb').MongoClient;
	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err)		console.log(err.message);

		db.collection('autoinc').findOne({},{_id:false}, function(err, res) {
			if(err) 	console.log(err.message);
			var cur_gid = res.gid;
			db.close();
			callback(cur_gid);
		});
	});
}



exports.createGateway = function(_lat,_lon,_status, callback)
{
	var db = mongoose.connection;
	mongoose.connect('mongodb://localhost:27017/registry');

	var mongo_client = require('mongodb').MongoClient;
	var Gateway = mongoose.model('gateways', config.gatewaySchema);
	var register_time = new Date();
	var cur_gid;


	autoincrementGid(function(cur_gid) {

		var obj = new Gateway({
				  gid: cur_gid+1
				, time: register_time
				, location: {lat:_lat , lon:_lon}
				, status: _status
			});

		obj.save(function(err, obj) {
			if(err) 	console.log("4: " + err.message);
		    console.log(obj);
		    db.close();
		});

		mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {

			db.collection('mapping').insert({gid:cur_gid+1, sidlist:[]}, function(err, res) {
				db.collection('heartbeat').insert({gid:cur_gid+1, lastseen:register_time}, function(err, res) {
					db.collection('autoinc').update({},{$inc:{gid:1}}, function(err, res) {
						db.close();
					});
				});
			});
		});
		callback(cur_gid);
	});

}



exports.updateGatewayStatus = function(_gid, _status)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('gateways').update({gid:_gid}, {$set:{status:_status}} );

		db.close();
	});

}



exports.updateGatewayLocation = function(_gid, _location)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		console.log(_location.lat + " " + _location.lon);
		db.collection('gateways').update({gid:_gid}, {$set:{'location.lat':_location.lat, 'location.lon':_location.lon}} );

		db.close();
	});

}



exports.getGatewayStatus = function(_gid, callback)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('gateways').findOne({gid:_gid}, function(err, doc) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
			callback(doc.status);
		});

	});
}




exports.getGatewayLocation = function(_gid, callback)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('gateways').findOne({gid:_gid}, function(err, doc) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
			callback(doc.location);
		});

	});
}


exports.deleteGateway = function(_gid)
{
	var mongo_client = require('mongodb').MongoClient;
	var mapped_sensors, num_gateways, sensors_per_head, remainder;
	var cur_gid;

	gateutil.getActiveSensorList(_gid, function(result) {
		mapped_sensors = result.sidlist;
		
		mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
			if(err) 	console.log(err.message);

			db.collection('gateways').remove({gid:_gid}, function(err, doc) {
				if(err) 	console.log(err.message);

				db.collection('mapping').remove({gid:_gid}, function(err, doc) {
					if(err) 	console.log(err.message);
				
					db.collection('heartbeat').remove({gid:_gid}, function(err, doc) {
						if(err) 	console.log(err.message);

						db.collection('gateways').count(function(err,num_gateways) {
							sensors_per_head = Math.floor(mapped_sensors.length/num_gateways);
							remainder = mapped_sensors.length%num_gateways;
	
							// console.dir("no of gateway: "+num_gateways);
							// console.dir("sensor per head: "+sensors_per_head);
							// console.dir("remainder: "+remainder);
							var index = 0;
							var flag1 = false, flag2 = false;

							var cursor = db.collection('gateways').find({}, {gid:true, _id:false});
							cursor.each(function(err, doc) {
								if(err) 	console.log(err.message);
								if(doc == null) {
									flag1 = true;
									if(flag2 == true)	return db.close()
									else	return;	
								}	

								var cur_gid = doc.gid;
							
								for(var i=index; i<index+sensors_per_head; i++) {
									db.collection('mapping').update({gid:cur_gid}, {$push: {sidlist: mapped_sensors[i]} });
									// console.log("i: " + i);
								}
								index = index + sensors_per_head;							
							});

							// console.dir("complete");	
							var j = mapped_sensors.length-remainder;
							cursor = db.collection('gateways').find({}, {gid:true, _id:false});
							
							cursor.each(function(err, doc) {
								if(err) 	console.log(err.message);
								if(doc == null || remainder == 0) {
									flag2 = true;
									if(flag1 == true)	return db.close()
									else	return;	
								}

								var cur_gid = doc.gid;
								// console.log("index: " + j);
								db.collection('mapping').update({gid:cur_gid}, {$push: {sidlist: mapped_sensors[j]} });
								j = j + 1;				
								remainder--;			
							});						

						});
					});
				});
			});
		});
	});
}