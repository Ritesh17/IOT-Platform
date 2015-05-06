var mongoose = require('mongoose');
var gateCRUD = require('./gateway_CRUD.js');
var sensorCRUD = require('./sensor_CRUD.js');
var repo = require('./repository.js');
var gateutil = require('./gateway_utils.js');
var filter = require('./filter.js');
var sg_mapping = require('./sensor_gateway_mapping.js');
var dataStoreAPI = require('./dataStoreAPI');
var net = require('net');

var gatewaySchema = new mongoose.Schema({
  gid: Number
, time: Date
, location: {lat : Number , lon : Number}
, status: Boolean
});


var sensorSchema = new mongoose.Schema({
  sid: Number
, type: Number  
, time: Date
, location: {lat : Number , lon : Number}
, status: Boolean
});


var dataSchema = new mongoose.Schema({
  sid: Number
, gid: Number
, timestamp: Date
, data: String
});



var Gateway = mongoose.model('gateways', gatewaySchema);
var Sensor = mongoose.model('sensors', sensorSchema);
var dataStore = mongoose.model('datastores', dataSchema);


gateCRUD.deleteGateway(3);

// setInterval(function(){
// 	dataStoreAPI.dataStore();
// },1000);

// /*
// setInterval(function(){ 
// 	gateutil.heartBeatChecker();
// }, 3000);


var server = net.createServer(function(socket) {

    //console.log("Data received from GATEWAY:");

    socket.on('data', function (data) 
    { 
    	var str=data.toString() ;
    	if(str=='heartbeat')
    	{
    		console.dir("heartbeat received");	
    	}  	
    	else
    	{
    		console.log("data from sensor:");
			console.log(data.toString());
			console.log();
    	}

    });

});

server.listen(8070);


// sg_mapping.addSensorsToGateway(1, [1,2,3]);
// sg_mapping.addSensorsToGateway(2, [4]);
// filter.authorizeData(2, 1, new Date(), 123);


// repo.storeDataInRepo(1,1,new Date(),1);


// gateCRUD.getGatewayStatus(1, function(result) {
// 	console.log(result);
// });


// gateCRUD.getGatewayLocation(1, function(result) {
// 	console.log(result);
// });

// sensorCRUD.getSensorLocation(1, function(result) {
// 	console.log(result);
// });



// t = {lat:111, lon:222};
// gateCRUD.updateGatewayLocation(1, t);
	// gateCRUD.deleteGateway(1);

// gateCRUD.createGateway(15, 13, true);

// gateCRUD.createGateway(15, 13, true, function(result) {
// 	console.log('config-curgid: ' + result);
// });

// console.log('hello');

// sensorCRUD.createSensor(5, 1, 15, 13, true);
// sensorCRUD.createSensor(6, 1, 15, 13, true);
// sensorCRUD.createSensor(7, 1, 15, 13, true);
// sensorCRUD.createSensor(8, 1, 15, 13, true);
// sensorCRUD.createSensor(9, 2, 15, 13, true);
// sensorCRUD.createSensor(11, 1, 15, 13, true);

// gateutil.getActiveSensorList(1, function(result) {
// 	console.log(result);	
// });


// sensorCRUD.updateSensorStatus(2, false);

// sensorCRUD.updateSensorLocation(1, t);


