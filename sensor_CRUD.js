var mongoose = require('mongoose');
var config = require('./config.js');
var routes = require('routes');

exports.createSensor = function(_sid, _type, _lat, _lon, _status)
{
	var db = mongoose.connection;
	mongoose.connect('mongodb://localhost:27017/registry');

	var Sensor = mongoose.model('sensors', config.sensorSchema);

	var obj = new Sensor({
		  sid: _sid
		, type: _type  
		, time: new Date()
		, location: {lat:_lat , lon:_lon}
		, status: _status
	});

	obj.save(function(err, obj) {
	  if (err) return console.error(err);
	  console.dir(obj);
	  db.close();
	});

}



exports.updateSensorStatus = function(_sid, _status)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('sensors').update({sid:_sid}, {$set:{status:_status}} );

		db.close();
	});

}



exports.updateSensorLocation = function(_sid, _location)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('sensors').update({sid:_sid}, {$set:{'location.lat':_location.lat, 'location.lon':_location.lon}} );

		db.close();
	});

}



exports.getSensorStatus = function(_sid, callback)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('sensors').findOne({sid:_sid}, function(err, doc) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
			callback(doc.status);
		});

	});
}


exports.getSensorLocation = function(_sid, callback)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('sensors').findOne({sid:_sid}, function(err, doc) {
			if(err) {
				console.log(err.message);
				return db.close();
			}

			db.close();
			callback(doc.location);
		});

	});
}