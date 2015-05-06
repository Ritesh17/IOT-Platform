var mongoose = require('mongoose');

exports.heartBeat = function(_gid)
{
	var mongo_client = require('mongodb').MongoClient;
	var threshold = 7*1000;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return;
		}

		db.collection('heartbeat').findOne({gid:_gid},{lastseen:true,_id:false}, function(error, doc) {
			if(error) {
				console.log(error.message);
				return;
			}

			if(doc != null) 
			{
				var lastping=doc.lastseen;
				var currping=new Date();
				console.dir(currping-lastping);
				
				var diff = currping-lastping;

				if(diff > threshold)
				{
					console.dir("Ping out of time");
					db.collection('gateways').update({gid:_gid},{$set:{status:true}}, function(error, doc) {
						if(error) {
							console.log(error.message);
							return;
						}
					});
				}
				else
				{
					console.dir("Ping within time");
				}
			
				db.collection('heartbeat').update({gid:_gid},{$set:{lastseen:currping}}, function(error, doc) {
					if(error) {
						console.log(error.message);
						return;
					}
					db.close();
				});
			}

		});

	});

}

exports.heartBeatChecker = function()
{
	var mongo_client = require('mongodb').MongoClient;
	var threshold = 7*1000;
	var currping = new Date();
	var lastping;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) 
		{
			console.log(err.message);
		}

		var cursor = db.collection('heartbeat').find({},{_id:false});

		cursor.each(function(err,doc) {
			if(err) {
				console.log(err.message);
				return;
			}

			if(doc == null)	
				return db.close();

			lastping=doc.lastseen;
			if(currping-lastping>threshold)
			{
				//console.dir("Gateway " + doc.gid + ": Goes down.");
				db.collection('gateways').update({gid:doc.gid},{$set:{status:false} });
			}
		});

	});

}

exports.getActiveSensorList = function(_gid, callback)
{
	var mongo_client = require('mongodb').MongoClient;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		db.collection('mapping').findOne({gid:_gid}, {sidlist:true, _id:false}, function(err, result) {
			if(err) {
				console.log(err.message);
				return db.close();
			}			

			db.close();
			callback(result);			
		});

	});

}