var len = 5
var speed = [];
var low = 30, high = 60;


for(var i=0; i<len; i++)
	speed[i] = low + (high-low)*Math.random();

console.log(speed);