var MongoClient = require('mongodb').MongoClient;

// Open the connection to the server
MongoClient.connect('mongodb://127.0.0.1:27017/registry', function(err, db) {
	if(err) throw err;

	var noOfGateway=7;
	
	for(var i=1;i<=noOfGateway;i++)
	{
		db.collection('gateway').insert({'gid':i,'time':new Date(),'loc': {'lat':Math.random()*100, 'lon':Math.random()*100}, 'status':'active'});
	}
	
    db.close();

    //console.dir("Gateway successfully registered...!!!");

});