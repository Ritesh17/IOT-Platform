var repo = require('./repository.js');

exports.authorizeData = function(_sid,_gid,_time,_data)
{
	var mongo_client = require('mongodb').MongoClient;
	var isSensorExist,isGatewayExist,isSensorMappedGateway;

	isSensorExistFucn(_sid,function(isSensorExist){
		// console.log("1: " + isSensorExist);

		isGatewayExistFucn(_gid,function(isGatewayExist){
			// console.log("2: " + isGatewayExist);
	
			isSensorMappedGatewayFunc(_sid,_gid,function(isSensorMappedGateway){
				// console.log("3: " + isSensorMappedGateway);
	
				if(isSensorExist && isGatewayExist && isSensorMappedGateway)
				{
					//allow data to store in db	
					// console.log('Valid data');
					repo.storeDataInRepo(_sid,_gid,_time,_data);
				}
				else
				{
					//unauthorized data
					console.log('Invalid data');
				}
			});
		});	
		

	});

}


isSensorExistFucn = function(_sid,callback)
{
	var mongo_client = require('mongodb').MongoClient;
	var result;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {

		if(err){
			console.log(err.message);
			return db.close();
		}

		db.collection('sensors').findOne({sid:_sid},function(err,doc){
			if(err){
				console.log(err.message);
				return db.close();
			}			

			if(doc!=null) 
				result=true;
			else
				result=false;

			db.close();	
			callback(result);
		});
	});
}

isGatewayExistFucn = function(_gid,callback)
{
	var mongo_client = require('mongodb').MongoClient;
	var result;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {

		if(err){
			console.log(err.message);
			return db.close();
		}

		db.collection('gateways').findOne({gid:_gid},function(err,doc){
			if(err){
				console.log(err.message);
				return db.close();
			}			

			if(doc!=null)
				result=true;
			else
				result=false;

			db.close();	
			callback(result);
		});
	});
}

isSensorMappedGatewayFunc = function(_sid, _gid,callback)
{
	var mongo_client = require('mongodb').MongoClient;
	var result;

	mongo_client.connect('mongodb://localhost:27017/registry', function(err, db) {

		if(err){
			console.log(err.message);
			return db.close();
		}

		db.collection('mapping').findOne({gid:_gid,sidlist:{$in:[_sid]}},function(err,doc){
			if(err){
				console.log(err.message);
				return db.close();
			}			

			if(doc!=null)
				result=true;
			else
				result=false;

			db.close();
			callback(result);
		});
	});
}
