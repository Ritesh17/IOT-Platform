function sendKey(app_name, key) {
	alert(app_name + " " + key);
	// mongo_client.connect('mongodb://localhost:27017/repository', function(err, db) {
	// 	if(err) {
	// 		console.log(err.message);
	// 		return db.close();
	// 	}		
		
	// 	db.collection('busroutes').insert({sname:source}, {busno:true, _id:false}, function(err, a1) {

	// 			db.close();
	// 			callback(result);
	// 		});
	// 	});

}

function getRegKey() {
	alert('hi');
	// var low, high, result = "";
	// low = 101, high = 199;
	// var x = Math.floor(low + (high-low)*Math.random());
	// low = 201, high = 799;
	// var y = Math.floor(low + (high-low)*Math.random());
	// result = result + x + "zh" + y + "rc";
	document.getElementById("key").value = "result";
	// var application_name = document.getElementById("app_name").value;
	// sendKey(application_name, result);
}

function clearAll() {
	document.getElementById("key").value = "";
	document.getElementById("app_name").value = "";
}