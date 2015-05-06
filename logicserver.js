var un = require('underscore');

exports.getBuses = function(source, destination, callback) 
{
	var mongo_client = require('mongodb').MongoClient;
	var result, src_buslist, dest_buslist;
	var busno = [];
	var speed = [];
	var last_location = [];
	var low = 30, high = 60;

	mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
		if(err) {
			console.log(err.message);
			return db.close();
		}		
		
		db.collection('routestore').findOne({sname:source}, {route:true, _id:false}, function(err, a1) {
			db.collection('routestore').findOne({sname:destination}, {route:true, _id:false}, function(err, a2) {
				src_buslist = a1.route;		
				dest_buslist = a2.route;

				busno = un.intersection(src_buslist, dest_buslist);
				
				var cursor = db.collection('datastore').find({sid:{$in:busno}});
				var index = 0;	

				cursor.each(function(err, doc) {
					if(err) {
						console.log(err.message);
						return db.close();
					}		
					if(doc == null)	{ 
						db.close(); 
						callback(busno, speed, last_location);
						return;
					 }

					// console.log(doc);
					// console.log(doc.data.speed +  " " + doc.data.lastloc);
					speed[index] = doc.data.speed;
					// console.log(index + ": " + speed[index]);	
					last_location[index] = doc.data.lastloc;
					index++;
				});

			});
		});


	});
}