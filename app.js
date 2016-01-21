// Express stuff
var express = require('express')
var app = express()
var firebase = require('firebase')
var fb = new firebase('https://need2wee.firebaseio.com/')


// Magnet stuff
var magnetSwitch;
var magnet = require("pi-pins").connect(17);
magnet.mode('in');
magnetSwitch = 0;

app.get('/', function (req, res) {
  res.send('Need2Wee online: ' + magnet.value())
});

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});

magnet.on('both', function () {
    console.log(magnet.value());
		if (magnet.value() == true) {
			fb.set({
				occupied: "true"
			});
		} else if(magnet.value() == false){
			fb.set({
				occupied: "false"
			});
		}
});
