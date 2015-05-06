var mongo_client = require('mongodb').MongoClient;

exports.dataStore = function()
{
	mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {

		if(err) {
			console.log(err.message);
			return;
		}

		db.collection('busroutes').findOne({busno:1},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:1},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});


		db.collection('busroutes').findOne({busno:2},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:2},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});


		db.collection('busroutes').findOne({busno:3},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:3},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});

		

		db.collection('busroutes').findOne({busno:4},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:4},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});

		

		db.collection('busroutes').findOne({busno:5},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:5},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});

		
				
		db.collection('busroutes').findOne({busno:6},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:6},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});


		

		db.collection('busroutes').findOne({busno:7},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:7},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});


				
		db.collection('busroutes').findOne({busno:8},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:8},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});


		
		db.collection('busroutes').findOne({busno:9},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:9},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});



		db.collection('busroutes').findOne({busno:10},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:10},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});



		db.collection('busroutes').findOne({busno:11},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:11},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});



		db.collection('busroutes').findOne({busno:12},{route:true,_id:false},function(err,res){

			if(err) {
				console.log(err.message);
				return;
			}

			var len=res.route.length;
			var index=Math.floor(len*Math.random());
			db.collection('datastore').update({sid:12},{$set:{'data.speed':30+30*Math.random(),'data.lastloc':res.route[index]}},function(err,doc){
				//db.close();
			});

		});								

	});
}