var net = require('net');
 
var server = net.createServer(function(socket) {

    //console.log("Data received from GATEWAY:");

    socket.on('data', function (data) 
    { 
    	var str=data.toString() ;
    	if(str=='heartbeat')
    	{
    		//console.dir("heartbeat received");	
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