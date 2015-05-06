var config = require('./config.js');
var mongoose = require('mongoose');
var routes = require('routes');

exports.storeDataInRepo = function(_sid, _gid, _time, _data)
{

	var db = mongoose.connection;
	mongoose.connect('mongodb://localhost:27017/repository');

	var dataStore = mongoose.model('datastores', config.dataSchema);

	var obj=new dataStore({
		sid:_sid,
		gid:_gid,
		timestamp:_time,
		data:_data
	});

	obj.save(function(err,obj){
		if(err) return console.error(err);
		console.dir(obj);
		db.close();
	});
	
}